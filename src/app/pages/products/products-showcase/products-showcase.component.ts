import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.css']
})
export class ProductsShowcaseComponent implements OnInit {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  products:Array<any> = [];


  constructor(private productsService: ProductsService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.unsubscribe2$.next(true);
    this.unsubscribe2$.complete();
  }

  obtenerProductos(){
    let params = this.activateRoute.snapshot.params["param"];

    this.productsService.getFilterProducts("category", params).pipe(takeUntil(this.unsubscribe$)).subscribe((resp1: any) => {

			if(Object.keys(resp1).length > 0){
				
				this.productsFnc(resp1);
				
			} else {

				this.productsService.getFilterProducts("sub_category", params).pipe(takeUntil(this.unsubscribe2$)).subscribe((resp2: any) => {
		
					this.productsFnc(resp2);			
									
				})

			}
			
		})
  }

  productsFnc(response: any){

    this.products = [];
    let getProducts = [];

    for (const key in response) {
      getProducts.push(response[key]);		
    }

    getProducts.forEach((product, index) => {
      if (index < 6) {
        this.products.push(product);
      }
    })
  }

}
