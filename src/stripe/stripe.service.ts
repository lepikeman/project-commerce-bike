import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';

@Injectable()
export class StripeService {
  private Stripe = require('stripe');
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private orderService: OrderService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      { apiVersion: '2024-06-20' },
    );
  }

  async createCheckoutSession(paymentData: {
    items: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    customerEmail: string;
  }) {
    try {
      const currency = this.configService.get<string>('CURRENCY', 'EUR');
      const lineItems = paymentData.items.map((item) => ({
        price_data: {
          currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));
      const paymentMethod = this.configService.get<any>(
        'PAYMENT_METHOD_TYPES',
        'card',
      );
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: paymentMethod,
        line_items: lineItems,
        mode: 'payment',
        success_url: `${this.configService.get('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('FRONTEND_URL')}/cart`,
        customer_email: paymentData.customerEmail,
        metadata: {
          order_items: JSON.stringify(
            paymentData.items.map((item) => ({
              id: item.id,
              quantity: item.quantity,
            })),
          ),
        },
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    } catch (error) {
      throw new BadRequestException('Error with the creation session');
    }
  }

  async verifyPayment(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === 'paid') {
        const orderItems = JSON.parse(session.metadata?.order_items || '[]');

        return {
          success: true,
          orderId: sessionId,
          customerEmail: session.customer_email,
          totalAmount: session.amount_total / 100,
          items: orderItems,
        };
      }
      return { success: false };
    } catch (error) {
      throw new BadRequestException('Error with validate payment');
    }
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );

    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          console.log('Order completed', session.id);
          break;
        case 'payment_intent.payment_failed':
          console.log('Payment intent failed');
          break;
      }
      return { received: true };
    } catch (error) {
      console.error('Webhook handling error:', error);
      throw new BadRequestException(`Webhook Error: ${error.message}`);
    }
  }

  async fulfillOrder(session: Stripe.Checkout.Session) {
    try {
      const paymentResult = await this.verifyPayment(session.id);
      if (paymentResult.success) {
        const orderData = {
          sessionId: paymentResult.orderId,
          customer_email: paymentResult.customerEmail,
          amount: paymentResult.totalAmount,
          items: paymentResult.items,
        };
        const id = parseInt(session.id);
        await this.orderService.saveOrder(id, orderData);
        console.log('Order successfully completed', session.id);
      }
    } catch (error) {
      throw new BadRequestException(
        `Error with validate payment: ${error.message}`,
      );
    }
  }
}
