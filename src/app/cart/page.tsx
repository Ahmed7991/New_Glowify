'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ShoppingCart, Minus, Plus, X, Loader2 } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showGuestEmailModal, setShowGuestEmailModal] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const estimatedTax = Math.round(cartTotal * 0.08); // 8% tax estimate
  const orderTotal = cartTotal + estimatedTax;

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleCheckout = async () => {
    if (!user && !guestEmail) {
      // Guest user needs to provide email
      setShowGuestEmailModal(true);
      return;
    }

    if (!user && guestEmail) {
      // Validate guest email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestEmail)) {
        setEmailError('Please enter a valid email address');
        return;
      }
    }

    setLoading(true);

    try {
      // Call checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerEmail: !user ? guestEmail : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleGuestEmailSubmit = () => {
    if (guestEmail) {
      setShowGuestEmailModal(false);
      handleCheckout();
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-gold/10 via-white to-baby-blue/10">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-playfair text-charcoal mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Start adding some beautiful products to your cart!
              </p>
              <Link href="/">
                <Button className="bg-rose-gold hover:bg-deep-rose text-white">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-gold/10 via-white to-baby-blue/10">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-playfair text-charcoal mb-8">
          Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemSubtotal = item.product.price * item.quantity;

              return (
                <Card key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize || 'default'}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg mb-1">{item.product.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{item.product.category}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor.hex)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Color and Size */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-5 h-5 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="text-sm text-gray-600">{item.selectedColor.name}</span>
                          </div>
                          {item.selectedSize && (
                            <span className="text-sm text-gray-600">Size: {item.selectedSize}</span>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.hex,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 font-medium">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedColor.hex,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">{formatPrice(item.product.price)} each</p>
                            <p className="text-lg font-semibold text-rose-gold">
                              {formatPrice(itemSubtotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-playfair text-charcoal">Order Summary</h2>

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax</span>
                    <span>{formatPrice(estimatedTax)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-rose-gold">{formatPrice(orderTotal)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-rose-gold hover:bg-deep-rose text-white py-6 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Guest Email Modal */}
      <Dialog open={showGuestEmailModal} onOpenChange={setShowGuestEmailModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Please provide your email address to receive order confirmation and updates.
            </p>
            <div className="space-y-2">
              <Label htmlFor="guest-email">Email Address</Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="you@example.com"
                value={guestEmail}
                onChange={(e) => {
                  setGuestEmail(e.target.value);
                  setEmailError('');
                }}
              />
              {emailError && <p className="text-sm text-red-600">{emailError}</p>}
            </div>
            <Button
              onClick={handleGuestEmailSubmit}
              className="w-full bg-rose-gold hover:bg-deep-rose text-white"
            >
              Continue to Checkout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
