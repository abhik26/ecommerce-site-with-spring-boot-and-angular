import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productBaseUrl = 'http://localhost:8080/api/products';
    private productCategoriesBaseUrl = 'http://localhost:8080/api/product-categories';

    constructor(private httpClient: HttpClient) { }

    getProductList(productCategoryId: number): Observable<Product[]> {

        const searchByProductCategoryUrl = `${this.productBaseUrl}/search/findByProductCategoryId?id=${productCategoryId}`;

        return this.httpClient.get<GetResponseProduct>(searchByProductCategoryUrl).pipe(
            map(response => response._embedded.products)
        )
    }

    getAllProducts(): Observable<Product[]> {
        return this.httpClient.get<GetResponseProduct>(this.productBaseUrl + '?size=100').pipe(
            map(response => response._embedded.products)
        )
    }

    getProductCategories(): Observable<ProductCategory[]> {
       return this.httpClient.get<GetResponseProductCategory>(this.productCategoriesBaseUrl).pipe(
            map(response => response._embedded.productCategories)
       )
    }

    searchProductsByKeyword(searchKeyword: string): Observable<Product[]> {

        const searchProductByKeywordUrl = this.productBaseUrl + `/search/findByNameContainingIgnoreCase?name=${searchKeyword}`;
        console.log(searchProductByKeywordUrl);
        return this.httpClient.get<GetResponseProduct>(searchProductByKeywordUrl).pipe(
            map(response => response._embedded.products)
        );
    }

}

interface GetResponseProduct {
    _embedded: {
        products: Product[];
    }
}

interface GetResponseProductCategory {
    _embedded: {
        productCategories: ProductCategory[];
    }
}
