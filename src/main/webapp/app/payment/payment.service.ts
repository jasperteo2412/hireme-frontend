import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { ENV_CONSTANTS } from 'app/constants/envConstans';
import { PaymentCheckout } from 'app/shared/model/payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public resourceUrl = ENV_CONSTANTS.development.paymentServerUrl + '/api/payments';
  constructor(protected http: HttpClient) {}

  createCheckoutSession(checkout: PaymentCheckout): Observable<any> {
    return this.http.post(`${this.resourceUrl}/payment`, checkout, { observe: 'response' });
  }

  saveSucessfulPayment(sessionId: string): Observable<any> {
    return this.http.put(`${this.resourceUrl}/save/${sessionId}`, null, { observe: 'response' });
  }

  getAllPastPayments(userId?: string): Observable<any> {
    return this.http.get(`${this.resourceUrl}/history/${userId}`, { observe: 'response' });
  }
}
