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
    return this.stripeService.handleWebhook(signature, req.rawBody);
  }
}
