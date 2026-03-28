import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export function ProductCard({ product, showAddToCart = false }: ProductCardProps) {
  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  // Get first 4 colors or all if less than 4
  const displayColors = product.colors.slice(0, 4);
  const hasMoreColors = product.colors.length > 4;

  return (
    <Link href={`/products/${product.category}/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-rose-gold">
        <CardContent className="p-4">
          {/* Product Image */}
          <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Color Swatches */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
              {displayColors.map((color) => (
                <div
                  key={color.hex}
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {hasMoreColors && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <p className="text-lg font-semibold text-rose-gold">
            {formatPrice(product.price)}
          </p>

          {/* Finish Badge */}
          <div className="mt-2">
            <span className="inline-block text-xs px-2 py-1 bg-baby-blue/20 text-charcoal rounded-full">
              {product.finish}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
