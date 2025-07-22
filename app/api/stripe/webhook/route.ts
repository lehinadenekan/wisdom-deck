import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

const resend = new Resend(process.env.RESEND_API_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email;

      if (customerEmail) {
        try {
          await resend.emails.send({
            from: 'Wisdom Deck <noreply@wisdomdeck.online>',
            to: customerEmail,
            subject: 'Your Yoruba Proverbs eBook!',
            html: `
              <h1>Thank you for your purchase!</h1>
              <p>You can download your eBook using the link below:</p>
              <a href="${process.env.NEXT_PUBLIC_EBOOK_URL}">Download eBook</a>
              <p>If you have any questions, please reply to this email.</p>
            `,
          });
          console.log(`✅ Email sent to ${customerEmail}`);
        } catch (error) {
          console.error('Error sending email:', error);
          return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
        }
      } else {
        console.error('Customer email not found in session.');
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
} 