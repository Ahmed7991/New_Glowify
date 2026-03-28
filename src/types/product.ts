export type Category = 'lipsticks' | 'foundations' | 'serums';

export type Finish = 'matte' | 'glossy' | 'satin' | 'metallic' | 'cream' | 'sheer' | 'serums' | '';

export interface ProductColor {
  name: string;           // "Ruby Red", "Natural Beige"
  hex: string;            // "#C41E3A"
  image?: string;         // Optional swatch image URL
}

export interface Product {
  id: string;             // "lipstick-ruby-red-001"
  name: string;           // "Ruby Red Matte Lipstick"
  category: Category;
  description: string;    // 2-3 sentences
  price: number;          // In cents: 2999 = $29.99
  colors: ProductColor[]; // Available color variants
  finish: Finish;
  ingredients: string[];  // ["Vitamin E", "Jojoba Oil", "Shea Butter"]
  sizes?: string[];       // ["5ml", "10ml", "15ml"] - optional, mainly for serums
  image: string;          // Main product image URL (placeholder URLs)
  featured?: boolean;     // Show on homepage
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
  selectedSize?: string;  // Optional for serums
}

export interface ProductMatch {
  product: Product;
  confidence: number;     // 0-100
  matchReason: string;    // "Matches your rose tones"
}
