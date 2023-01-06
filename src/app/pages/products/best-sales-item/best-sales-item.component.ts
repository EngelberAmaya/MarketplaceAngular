import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { OwlCarouselConfig, CarouselNavigation, Rating, DinamicRating, DinamicReviews, DinamicPrice } from '../../../functions';

@Component({
  selector: 'app-best-sales-item',
  templateUrl: './best-sales-item.component.html',
  styleUrls: ['./best-sales-item.component.css']
})
export class BestSalesItemComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  bestSalesItem: Array<any> = [];
  render = true;
  rating: Array<any> = [];
	reviews: Array<any> = [];
	price: Array<any> = [];
	cargando = false;

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

    this.productsService.getFilterProducts("category", params).pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) => {
  
      if(Object.keys(resp).length > 0){
  
        this.productsFnc(resp);
  
      } else {
  
        this.productsService.getFilterProducts("sub_category", params).pipe(takeUntil(this.unsubscribe2$)).subscribe((resp2: any) => {
          this.productsFnc(resp2);
        }, err => {
          console.log(err);
        })
  
      }      
  
    }, err => {
      console.log(err);
    })

  }

  productsFnc(response){

    this.bestSalesItem = [];
    let getSales:any = [];

    for (const key in response) {
      getSales.push(response[key]);     
    }

    getSales.sort(function(a:any,b:any){
			return (b.sales - a.sales)
		})	

    getSales.forEach((product, index)=>{

      if(index < 10){
				this.bestSalesItem.push(product);
        this.rating.push(DinamicRating.fnc(this.bestSalesItem[index]));
        this.reviews.push(DinamicReviews.fnc(this.rating[index]));
        this.price.push(DinamicPrice.fnc(this.bestSalesItem[index]));
      }
    })
      
  }

  callback(){

    if(this.render){

      this.render = false;

      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
      Rating.fnc();
    
    }

  }

}
