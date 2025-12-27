import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Payment } from "../models/payment.model";


@Injectable({ providedIn: 'root' })
export class PaymentService {
    private api = 'https://localhost:7270/api/payments';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Payment[]>(this.api);
    }

    getById(id: number) {
        return this.http.get<Payment>(`${this.api}/${id}`);
    }

    create(payment: any) {
        return this.http.post(this.api, payment);
    }

    update(id: number, payment: any) {
        return this.http.put(`${this.api}/${id}`, payment);
    }

    delete(id: number) {
        return this.http.delete(`${this.api}/${id}`);
    }
}
