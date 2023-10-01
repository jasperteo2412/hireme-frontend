import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { paymentRoute } from './payment.route';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [SuccessComponent, CancelComponent, CheckoutComponent],
  imports: [CommonModule, RouterModule.forChild(paymentRoute)],
})
export class PaymentModule {}
