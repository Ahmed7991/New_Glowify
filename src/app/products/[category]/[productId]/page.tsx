'use client';

import { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, getProductsByCategory } from '@/lib/products';
import { ProductColor } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { ColorSelector } from '@/components/ColorSelector';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, ShoppingCart, ArrowLeft } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{
    category: string;
    productId: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { category, productId } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  // State
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Format price
  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Get related products (same category, different product)
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-gold/10 via-white to-baby-blue/10">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href={`/products/${category}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-rose-gold mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {category}
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3 bg-baby-blue text-charcoal">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-playfair text-charcoal mb-3">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-rose-gold mb-4">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Finish Badge */}
            <div>
              <span className="inline-block text-sm px-3 py-1 bg-gold/20 text-charcoal rounded-full font-medium">
                {product.finish} finish
              </span>
            </div>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div>
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onSelect={setSelectedColor}
                />
              </div>
            )}

            {/* Size Selector (for serums) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Size</h3>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-rose-gold hover:bg-deep-rose text-white text-lg py-6"
              size="lg"
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Ingredients Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="ingredients">
                <AccordionTrigger className="text-left">
                  Ingredients & Benefits
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-rose-gold mr-2">•</span>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-playfair text-charcoal mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
