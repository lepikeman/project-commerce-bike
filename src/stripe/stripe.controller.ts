import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() paymentData: CreatePaymentDto) {
    return this.stripeService.createCheckoutSession(paymentData);
  }

  @Get('verify-payment')
  async verifyPayment(@Query('sessionId') sessionId: string) {
    return this.stripeService.verifyPayment(sessionId);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    let event;
    try {
      event = this.stripeService.handleWebhook(signature, req.rawBody);
    } catch (error) {
      console.error('Webhook signature verification failed.', error.message);
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        await this.stripeService.fulfillOrder(session);
        return {
          statusCode: 200,
          message: 'Checkout completed successfully.',
        };
      } catch (error) {
        console.error('Webhook signature verification failed.', error.message);
        return {
          statusCode: 400,
          message: 'Webhook signature verification failed.',
        };
      }
    }
    return {
      statusCode: 200,
      message: 'Event received successfully',
    };
  }
}
