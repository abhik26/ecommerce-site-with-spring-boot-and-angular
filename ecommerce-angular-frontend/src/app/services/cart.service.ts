import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[] = [];
    totalItemInCart: Subject<number> = new BehaviorSubject<number>(0);
    totalPriceOfCart: Subject<number> = new BehaviorSubject<number>(0);

    // private webStorage: Storage = sessionStorage;
    private webStorage: Storage = localStorage;

    private readonly cartItemsStorageKey: string = 'cartItems';

    constructor() {
        // read data from web storage
        let data = JSON.parse(this.webStorage.getItem(this.cartItemsStorageKey));

        if (data) {
            this.cartItems = data;
            this.computeCartTotals();
        }
    }

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

        this.persistCartItems();
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

    resetCart() {
        this.cartItems = [];
        this.totalItemInCart.next(0);
        this.totalPriceOfCart.next(0);
    }

    persistCartItems() {
        this.webStorage.setItem(this.cartItemsStorageKey, JSON.stringify(this.cartItems));
    }
}
