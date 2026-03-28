import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  let order = null;

  // If authenticated, try to fetch order details
  if (user && session_id) {
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('stripe_session_id', session_id)
      .single();

    order = data;
  }

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-gold/10 via-white to-baby-blue/10">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-gold" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl font-playfair text-charcoal mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>

            {/* Order Details */}
            {order ? (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg text-left">
                <h2 className="font-semibold text-lg mb-4">Order Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{order.id.slice(0, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{order.customer_email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium text-rose-gold">
                      {formatPrice(order.amount_total)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600 capitalize">{order.status}</span>
                  </div>
                </div>

                {/* Order Items */}
                {order.order_items && order.order_items.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-medium mb-2">Items ({order.order_items.length}):</h3>
                    <ul className="space-y-2">
                      {order.order_items.map((item: any, index: number) => (
                        <li key={index} className="text-sm text-gray-600">
                          <span>{item.quantity}x {item.product_name}</span>
                          {item.selected_color_name && (
                            <span className="text-gray-500"> • {item.selected_color_name}</span>
                          )}
                          {item.selected_size && (
                            <span className="text-gray-500"> • {item.selected_size}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  {session_id ? (
                    <>Order Reference: <span className="font-medium">{session_id.slice(-12).toUpperCase()}</span></>
                  ) : (
                    'A confirmation email has been sent to your email address.'
                  )}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user && (
                <Link href="/account">
                  <Button className="bg-rose-gold hover:bg-deep-rose text-white">
                    View Order History
                  </Button>
                </Link>
              )}
              <Link href="/">
                <Button variant="outline" className="border-2 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
