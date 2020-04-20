import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl: string = `http://localhost:8000`;

  constructor(private http: HttpClient) { }

  public newPayment(info): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/payment/new`, info);
  }
}
