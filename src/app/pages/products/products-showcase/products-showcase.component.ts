import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice, Pagination } from '../../../functions';

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
  params = '';
  page: any;
  productFound = 0;
	currentRoute = '';
	totalPage = 0;

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
    this.params = this.activateRoute.snapshot.params["param"].split("&")[0];
    this.page = this.activateRoute.snapshot.params["param"].split("&")[1];
    this.currentRoute = `products/${this.params}`
    this.cargando = true;

    this.productsService.getFilterProducts("category", this.params).pipe(takeUntil(this.unsubscribe$)).subscribe((resp1: any) => {

			if(Object.keys(resp1).length > 0){
				
				this.productsFnc(resp1);
				
			} else {

				this.productsService.getFilterProducts("sub_category", this.params).pipe(takeUntil(this.unsubscribe2$)).subscribe((resp2: any) => {
		
					this.productsFnc(resp2);			
									
				}, err => {
          console.log(err);
        })

			}
			
		}, err => {
      console.log(err);
    })
  }

  productsFnc(response: any){

    this.products = [];
    let getProducts:any = [];
    let total = 0;

    for (const key in response) {
      getProducts.push(response[key]);
      total++;		
    }

    this.productFound = total;
    this.totalPage = Math.ceil(total/6);

    getProducts.forEach((product, index) => {

      if(this.page == undefined){
				this.page = 1;
			}

      let first = Number(index) + (this.page * 6) - 6;
      let last = 6 * this.page;

      if (first < last) {

        if(getProducts[first] != undefined){

          this.products.push(getProducts[first]);
          this.rating.push(DinamicRating.fnc(getProducts[first]));					
          this.reviews.push(DinamicReviews.fnc(this.rating[index]));
          this.price.push(DinamicPrice.fnc(getProducts[first]));
          this.cargando = false;
        }
      }
    })
  }

  callback(){
    if(this.render){

      this.render = false;

      Rating.fnc();
      Pagination.fnc();
      
    }  
  }

}
