'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function CartModal() {
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only showing cart count after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {mounted && cartCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gold text-white text-xs"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">Your Cart</DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/">
              <Button className="bg-rose-gold hover:bg-deep-rose text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {items.map((item) => {
                const itemSubtotal = item.product.price * item.quantity;

                return (
                  <div
                    key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize || 'default'}`}
                    className="flex gap-4 border-b pb-4"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product.name}</h3>

                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                          title={item.selectedColor.name}
                        />
                        <span className="text-xs text-gray-600">{item.selectedColor.name}</span>
                      </div>

                      {item.selectedSize && (
                        <p className="text-xs text-gray-600 mt-1">Size: {item.selectedSize}</p>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor.hex,
                                item.quantity - 1
                              )
                            }
                            className="p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor.hex,
                                item.quantity + 1
                              )
                            }
                            className="p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="text-sm font-medium">
                          {formatPrice(itemSubtotal)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor.hex)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Subtotal:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <Link href="/cart" className="block">
                <Button className="w-full bg-rose-gold hover:bg-deep-rose text-white">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
