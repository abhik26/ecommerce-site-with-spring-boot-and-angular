import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

    cartItems: CartItem[] = [];
    totalPriceOfCart: number = 0.0;
    totalItemInCart: number = 0;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.listCartItems();
    }

    listCartItems() {
        this.cartItems = this.cartService.cartItems;
        this.cartService.totalItemInCart.subscribe(data => this.totalItemInCart = data);
        this.cartService.totalPriceOfCart.subscribe(data => this.totalPriceOfCart = data);
        this.cartService.computeCartTotals();
    }

    decrementQuantity(cartItem: CartItem) {
        this.cartService.decrementQuantity(cartItem);
    }

    incrementQuantity(cartItem: CartItem) {
        this.cartService.addToCart(cartItem);
    }

    removeItem(cartItem: CartItem) {
        this.cartService.removeItem(cartItem);
    }

}
