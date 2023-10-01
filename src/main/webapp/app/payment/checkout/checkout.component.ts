import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'app/constants/envConstans';
import { PaymentCheckout } from 'app/shared/model/payment.model';

@Component({
  selector: 'jhi-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  stripePromise = loadStripe(environment.stripe);
  constructor(protected paymentService: PaymentService) {}

  ngOnInit(): void {}

  async pay(): Promise<void> {
    const payment: PaymentCheckout = {
      productName: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amt: 99900,
      cancelUrl: 'http://localhost:9001/payment/cancel',
      successUrl: 'http://localhost:9001/payment/success',
    };

    const stripe = await this.stripePromise;
    this.paymentService.createCheckoutSession(payment).subscribe((data: any) => {
      console.log('stripe:' + data.body.id);
      if (stripe != null) {
        stripe.redirectToCheckout({
          sessionId: data.body.id,
        });
      }
    });
  }
}
