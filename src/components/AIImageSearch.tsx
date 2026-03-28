'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { analyzeImage } from '@/lib/ai-service';
import { ProductMatch } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, X, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AIImageSearch() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ProductMatch[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    setResults([]);

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB.');
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag and drop
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  // Handle image analysis
  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const matches = await analyzeImage(selectedFile);
      setResults(matches);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  // Reset state
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResults([]);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!selectedFile ? (
        <Card
          className={`border-2 border-dashed transition-all ${
            isDragging
              ? 'border-rose-gold bg-rose-gold/5'
              : 'border-baby-blue hover:border-rose-gold'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CardContent className="p-12 text-center">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileInputChange}
            />
            <label htmlFor="image-upload" className="cursor-pointer block">
              <div className="pointer-events-none">
                <Upload className="w-16 h-16 text-baby-blue mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">
                  Upload an image to find matching products
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Drag and drop or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  Supports JPG, PNG, WEBP (max 10MB)
                </p>
              </div>
            </label>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Image Preview */}
              {previewUrl && (
                <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={previewUrl}
                    alt="Upload preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-charcoal mb-1 truncate">
                  {selectedFile.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="bg-rose-gold hover:bg-deep-rose text-white"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-playfair text-charcoal mb-2">
              Your Perfect Matches
            </h2>
            <p className="text-gray-600">
              We found {results.length} products that match your image
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {results.map((match) => (
              <div key={match.product.id} className="relative">
                <ProductCard product={match.product} />
                <Badge className="absolute top-2 right-2 bg-gold text-white font-semibold shadow-lg">
                  {Math.round(match.confidence)}% Match
                </Badge>
                <p className="text-xs text-center text-gray-500 mt-2">
                  {match.matchReason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
