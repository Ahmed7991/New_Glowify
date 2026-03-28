import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createServiceRoleClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract data from session
      const userId = session.metadata?.userId;
      const cartData = session.metadata?.cartData;

      if (!cartData) {
        console.error('No cart data in session metadata');
        return NextResponse.json({ received: true });
      }

      // Parse cart data
      const items = JSON.parse(cartData);

      // Use service role client to bypass RLS
      const supabase = createServiceRoleClient();

      // Check if order already exists (idempotency)
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('id')
        .eq('stripe_session_id', session.id)
        .single();

      if (existingOrder) {
        console.log('Order already exists, skipping creation');
        return NextResponse.json({ received: true });
      }

      // Create order record
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId === 'guest' ? null : userId,
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          amount_total: session.amount_total!,
          currency: session.currency,
          status: 'paid',
          customer_email: session.customer_email || session.customer_details?.email,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
      }

      // Create order items
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_category: item.product.category,
        selected_color_name: item.selectedColor.name,
        selected_color_hex: item.selectedColor.hex,
        selected_size: item.selectedSize || null,
        quantity: item.quantity,
        unit_price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        throw itemsError;
      }

      console.log('Order created successfully:', order.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
