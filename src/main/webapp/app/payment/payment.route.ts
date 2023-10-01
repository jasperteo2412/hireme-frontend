import { Routes } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const paymentRoute: Routes = [
  {
    path: '',
    children: [
      {
        path: 'success',
        component: SuccessComponent,
      },
      {
        path: 'cancel',
        component: CancelComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ],
  },
];
