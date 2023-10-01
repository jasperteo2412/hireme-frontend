import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'jhi-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params: ', params);
      this.paymentService.saveSucessfulPayment(params.session_id).subscribe();
    });
  }
}
