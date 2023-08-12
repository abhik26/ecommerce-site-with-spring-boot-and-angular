import { CartItem } from "./cart-item";
import { Product } from "./product";

export class OrderItem {
    quantity: number;
    product: Product;

    constructor(cartItem: CartItem) {
        this.product = new Product(Number(cartItem.id), null, null, null, null, null, null, null, null, null);
    }
}
