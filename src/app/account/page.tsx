import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { User, Package, Calendar } from 'lucide-react';

export default async function AccountPage() {
  const supabase = await createServerClient();

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch user's orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-gold/10 via-white to-baby-blue/10">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-playfair text-charcoal mb-8">
          My Account
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Account Info */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-rose-gold" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Name</p>
                  <p className="font-medium">
                    {user.user_metadata?.full_name || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="font-medium">
                    {formatDate(user.created_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-rose-gold" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!orders || orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No orders yet</p>
                    <p className="text-sm text-gray-400">
                      Start shopping to see your orders here
                    </p>
                    <Link
                      href="/"
                      className="inline-block mt-4 text-rose-gold hover:text-deep-rose font-medium"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {orders.map((order: any, index: number) => (
                      <AccordionItem key={order.id} value={`order-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-start justify-between w-full pr-4 text-left">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">
                                  Order #{order.id.slice(0, 8).toUpperCase()}
                                </p>
                                <Badge
                                  className={
                                    order.status === 'paid'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(order.created_at)}
                                </span>
                                <span>
                                  {order.order_items?.length || 0} item{order.order_items?.length !== 1 ? 's' : ''}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-rose-gold">
                                {formatPrice(order.amount_total)}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4 space-y-3">
                            {order.order_items && order.order_items.length > 0 ? (
                              order.order_items.map((item: any, itemIndex: number) => (
                                <div
                                  key={itemIndex}
                                  className="flex justify-between items-start py-3 border-b last:border-b-0"
                                >
                                  <div className="flex-1">
                                    <p className="font-medium">{item.product_name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      {item.selected_color_hex && (
                                        <div
                                          className="w-4 h-4 rounded-full border border-gray-300"
                                          style={{ backgroundColor: item.selected_color_hex }}
                                        />
                                      )}
                                      <p className="text-sm text-gray-600">
                                        {item.selected_color_name}
                                        {item.selected_size && ` • ${item.selected_size}`}
                                        {' • '}Qty: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">
                                      {formatPrice(item.unit_price * item.quantity)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {formatPrice(item.unit_price)} each
                                    </p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500">No items found</p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
