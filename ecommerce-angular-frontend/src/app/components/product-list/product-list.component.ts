import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
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

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

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

        this.productService.getProductList(this.productCategoryId).subscribe(
            data => {
                this.products = data;
            }
        )
    } else if (hasSearchKeyword) {
        this.productService.searchProductsByKeyword(this.route.snapshot.paramMap.get('keyword')!).subscribe(
            data => {
                this.products = data;
            }
        );
    } else {
        this.productService.getAllProducts().subscribe(
            data => {
                this.products = data;
            }
        )
    }
  }

}
