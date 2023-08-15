import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

    orderHistoryList: OrderHistory[] = [];
    private webStorage: Storage = sessionStorage;
    private readonly userEmailStorageKey: string = 'userEmail';

    constructor(private orderHistoryService: OrderHistoryService) { }

    ngOnInit(): void {
        this.handleOrderHistory();
    }

    handleOrderHistory() {
        const userEmail = JSON.parse(this.webStorage.getItem(this.userEmailStorageKey));
        console.log(userEmail);
        this.orderHistoryService.getOrderHistory(userEmail).subscribe(
            data => this.orderHistoryList = data
        );
    }
}
