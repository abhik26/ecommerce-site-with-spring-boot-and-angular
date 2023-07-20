import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[] = [];
    totalItemInCart: Subject<number> = new Subject<number>();
    totalPriceOfCart: Subject<number> = new Subject<number>();

    constructor() { }

    addToCart(cartItemToAdd: CartItem) {
        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem = null;

        if (this.cartItems.length > 0) {
            existingCartItem = this.cartItems.find(item => item.id === cartItemToAdd.id);

            if (existingCartItem) {
                existingCartItem.quantity++;
            } else {
                this.cartItems.push(cartItemToAdd);
            }
        } else {
            this.cartItems.push(cartItemToAdd);
        }

        this.computeCartTotals();
    }

    computeCartTotals() {
        let tempTotalPrice: number = 0;
        let tempTotalItem: number = 0;

        for (let cartItem of this.cartItems) {
            tempTotalPrice += cartItem.quantity * cartItem.unitPrice;
            tempTotalItem++;
        }

        this.totalPriceOfCart.next(tempTotalPrice);
        this.totalItemInCart.next(tempTotalItem);
    }

    decrementQuantity(item: CartItem) {
        if (item) {
            item.quantity--;

            if (!item.quantity) {
                this.removeItem(item);
            } else {
                this.computeCartTotals();
            }
        }
    }

    removeItem(cartItem: CartItem) {
        if (cartItem) {
            let index: number = this.cartItems.findIndex(item => item.id == cartItem.id);

            if (index > -1) {
                this.cartItems.splice(index, 1);
                this.computeCartTotals();
            }
        }
    }
}
