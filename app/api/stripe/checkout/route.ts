import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Òwe Yorùbá: 40 Illustrated Proverbs',
              images: [`${req.nextUrl.origin}/book-cover.png`],
            },
            unit_amount: 200,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/yoruba-proverbs?success=true`,
      cancel_url: `${req.nextUrl.origin}/yoruba-proverbs?canceled=true`,
      customer_email: email,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 