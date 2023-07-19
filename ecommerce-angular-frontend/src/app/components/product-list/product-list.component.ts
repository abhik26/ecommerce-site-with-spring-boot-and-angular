import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product-list',
    //   templateUrl: './product-list.component.html',
    //   templateUrl: './product-list-table.component.html',
    templateUrl: './product-list-grid.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    productCategoryId: number = 1;
    previousProductCategoryId: number = 0;

    currentPage: number = 1;
    currentPageSize: number = 12;
    totalElements: number = 0;
    totalPages: number = 0;

    constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(() => {
            this.listProducts();
        });
    }

    listProducts() {

        // check if "id" parameter is available
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
        const hasCategoryInPath: boolean = this.route.snapshot.url[0].path.toLowerCase() == 'category';
        const hasSearchKeyword: boolean = this.route.snapshot.url[0].path.toLowerCase() == 'search'
            && this.route.snapshot.paramMap.has('keyword');

        if (hasCategoryInPath) {
            if (hasCategoryId) {
                // get the "id" param string. Convert string to a number using the "+" symbol.
                this.productCategoryId = + this.route.snapshot.paramMap.get('id')!;
            } else {
                this.productCategoryId = 6;
            }

            if (this.productCategoryId !== this.previousProductCategoryId) {
                this.currentPage = 1;
                this.previousProductCategoryId = this.productCategoryId;
            }

            this.productService.getProductListWithPagination(this.productCategoryId, this.currentPage - 1, this.currentPageSize)
                .subscribe(
                    data => {
                        this.products = data._embedded.products;
                        this.currentPage = data.page.number + 1;
                        this.totalElements = data.page.totalElements;
                        this.totalPages = data.page.totalPages;
                    }
                );
        } else if (hasSearchKeyword) {
            this.productService.searchProductsByKeyword(this.route.snapshot.paramMap.get('keyword')!).subscribe(
                data => {
                    this.products = data;
                }
            );
        } else {
            this.productService.getAllProducts(this.currentPage - 1, this.currentPageSize).subscribe(
                data => {
                    this.products = data._embedded.products;
                    this.currentPage = data.page.number + 1;
                    this.totalElements = data.page.totalElements;
                    this.totalPages = data.page.size;
                }
            )
        }
    }

    addToCart(product: Product) {
        console.log(`Add product to cart: ${product.name}, ${product.unitPrice}`);
        this.cartService.addToCart(new CartItem(product));
    }

}
