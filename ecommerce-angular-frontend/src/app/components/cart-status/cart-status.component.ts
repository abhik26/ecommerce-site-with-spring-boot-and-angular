import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart-status',
    templateUrl: './cart-status.component.html',
    styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

    totalPriceOfCart: number = 0.00;
    totalItemInCart: number = 0;

    constructor(private cartService: CartService) {
        this.updateCartStatus();
    }

    updateCartStatus() {
        this.cartService.totalItemInCart.subscribe((data) => {
            this.totalItemInCart = data;
        });

        this.cartService.totalPriceOfCart.subscribe((data) => {
            this.totalPriceOfCart = data;
        });
    }

    ngOnInit(): void {
    }

}
