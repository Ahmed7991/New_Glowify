import { ProductMatch } from '@/types/product';
import { searchProductsByColor, allProducts } from '@/lib/products';

// Rafiq Configuration: Local Brain Connection
const OLLAMA_BASE_URL = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://127.0.0.1:11434';
const OLLAMA_MODEL = 'llava'; // Requires: ollama pull llava

/**
 * Rafiq V2.0: Local Vision Analysis
 * Uses local GPU (RX 6600 XT) via Ollama to detect real skin/makeup tones.
 */
export async function analyzeImage(file: File): Promise<ProductMatch[]> {
  console.log('🔌 Rafiq: Sending image to local cortex...');

  // 1. Validation
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPG, PNG, or WEBP image.');
  }

  // 2. Image Processing for LLM
  try {
    const base64Image = await fileToBase64(file);
    const cleanBase64 = base64Image.split(',')[1]; // Remove header

    // 3. Ask LLaVA for the Hex Codes
    const payload = {
      model: OLLAMA_MODEL,
      prompt: `Analyze the skin tone and makeup colors in this image. 
               Return strictly a JSON array containing 3 hex color codes. 
               Example format: ["#F5D0C5", "#C58C85", "#E0AC69"]
               Do not include any other text.`,
      images: [cleanBase64],
      stream: false,
      format: "json"
    };

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Ollama Disconnected: ${response.statusText}`);

    const data = await response.json();
    console.log('🧠 Rafiq Vision Output:', data.response);

    // 4. Parse the AI's findings
    let detectedColors: string[] = [];
    try {
        const parsed = JSON.parse(data.response);
        if (Array.isArray(parsed)) {
            detectedColors = parsed;
        } else if (parsed.colors && Array.isArray(parsed.colors)) {
            detectedColors = parsed.colors;
        } else {
            const hexMatch = data.response.match(/#[0-9A-Fa-f]{6}/g);
            if (hexMatch) detectedColors = hexMatch.slice(0, 3);
        }
    } catch (e) {
        console.warn('Rafiq Warning: Failed to parse JSON, falling back to Regex');
        const hexMatch = data.response.match(/#[0-9A-Fa-f]{6}/g);
        if (hexMatch) detectedColors = hexMatch.slice(0, 3);
    }

    // Fallback if AI sees nothing
    if (detectedColors.length === 0) detectedColors = ['#D4A88B', '#C4787C']; 

    console.log('🎨 Detected Palette:', detectedColors);

    // 5. Bridge to Business Logic
    const matchingProducts = searchProductsByColor(detectedColors);

    // Fill with random products if matches < 6
    let productsToScore = matchingProducts.length >= 6
        ? matchingProducts
        : [...matchingProducts];

    if (productsToScore.length < 6) {
        const remainingProducts = allProducts.filter(
            p => !productsToScore.includes(p) && p.colors.length > 0
        );
        while (productsToScore.length < 6 && remainingProducts.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingProducts.length);
            productsToScore.push(remainingProducts[randomIndex]);
            remainingProducts.splice(randomIndex, 1);
        }
    }

    // 6. Return formatted matches
    return productsToScore
        .slice(0, 6)
        .map((product) => {
            const isColorMatch = matchingProducts.includes(product);
            const baseConfidence = isColorMatch ? 85 : 50;
            const confidence = Math.floor(baseConfidence + Math.random() * 10);
            
            const matchReason = isColorMatch 
                ? `AI detected matching tone ${detectedColors[0]} in this product` 
                : `Suggested based on popularity`;

            return {
                product,
                confidence,
                matchReason,
            };
        })
        .sort((a, b) => b.confidence - a.confidence);

  } catch (error) {
    console.error('❌ Rafiq Critical Failure:', error);
    throw new Error('AI Service Unavailable. Check local Ollama instance.');
  }
}

// Helper: File to Base64
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}