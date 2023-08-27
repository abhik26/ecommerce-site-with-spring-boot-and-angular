import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderHistoryService {

    private readonly orderUrl: string = `${environment.apiUrl}/orders`;

    constructor(private httpClient: HttpClient) { }

    getOrderHistory(userEmail: string): Observable<OrderHistory[]> {
        const ordersByUserEmail: string = `${this.orderUrl}/search/findByCustomerEmailIgnoreCaseOrderByDateCreatedDesc?email=${userEmail}`;
        return this.httpClient.get<OrderHistoryResponse>(ordersByUserEmail).pipe(
                map(response => response._embedded.orders)
            );
    }
}

interface OrderHistoryResponse {
    _embedded: {
        orders: OrderHistory[]
    }
}
