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

    getProductListWithPagination(productCategoryId: number, page: number, pageSize: number): Observable<GetResponseProduct> {

        const searchByProductCategoryUrl = `${this.productBaseUrl}/search/findByProductCategoryId?id=${productCategoryId}`
                + `&page=${page}&size=${pageSize}`;

        return this.httpClient.get<GetResponseProduct>(searchByProductCategoryUrl);
    }

    getAllProducts(page: number, pageSize: number): Observable<GetResponseProduct> {
        return this.httpClient.get<GetResponseProduct>(this.productBaseUrl + `?page=${page}&size=${pageSize}`);
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

    getProduct(productId: number): Observable<Product> {
        const productUrl = `${this.productBaseUrl}/${productId}`;
        return this.httpClient.get<Product>(productUrl);
    }

}

interface GetResponseProduct {
    _embedded: {
        products: Product[];
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}

interface GetResponseProductCategory {
    _embedded: {
        productCategories: ProductCategory[];
    }
}
