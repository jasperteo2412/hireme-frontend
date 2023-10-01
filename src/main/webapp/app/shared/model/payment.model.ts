export interface PaymentCheckout {
  productName?: string;
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  amt: number;
}
