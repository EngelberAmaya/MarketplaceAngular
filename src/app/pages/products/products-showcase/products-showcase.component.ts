import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice } from '../../../functions';

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.css']
})
export class ProductsShowcaseComponent implements OnInit {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  products:Array<any> = [];
  render = true;
  cargando = false;
  rating: Array<any> = [];
	reviews: Array<any> = [];
	price: Array<any> = [];

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
    this.cargando = true;

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
    let getProducts:any = [];

    for (const key in response) {
      getProducts.push(response[key]);		
    }

    getProducts.forEach((product, index) => {
      if (index < 6) {
        this.products.push(product);
        this.rating.push(DinamicRating.fnc(this.products[index]));					
				this.reviews.push(DinamicReviews.fnc(this.rating[index]));
				this.price.push(DinamicPrice.fnc(this.products[index]));
        this.cargando = false;
      }
    })
  }

  callback(){
    if(this.render){

      this.render = false;

      Rating.fnc();
      
    }  
  }

}
