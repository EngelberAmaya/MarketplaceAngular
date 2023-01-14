import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice, CountDown, ProgressBar, Tabs } from '../../../functions';;

@Component({
  selector: 'app-product-left',
  templateUrl: './product-left.component.html',
  styleUrls: ['./product-left.component.css']
})
export class ProductLeftComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  product: Array<any>= [];
  rating: Array<any> = [];
	reviews: Array<any> = [];
	price: Array<any> = [];
  cargando = false;
  render = true;
  countd: Array<any> = [];

  constructor(private activateRoute: ActivatedRoute,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.obtenerInformacion();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  obtenerInformacion(){
    this.cargando = true;
    this.productsService.getFilterProducts("url", this.activateRoute.snapshot.params["param"])
      .pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) => {
        console.log(resp);
        this.productsFnc(resp);	
      })
  }

  productsFnc(response){

    this.product = [];
    let getProduct:any = [];

    for (const key in response) {
      getProduct.push(response[key]);     
    }

    getProduct.forEach((product, index) => {
    
			this.product.push(product);
      this.rating.push(DinamicRating.fnc(this.product[index]));
      this.reviews.push(DinamicReviews.fnc(this.rating[index]));
      this.price.push(DinamicPrice.fnc(this.product[index]));

      if(this.product[index].offer != ""){
    		const date = JSON.parse(this.product[index].offer)[2]; 
         
        this.countd.push(
        	new Date(
        		parseInt(date.split("-")[0]),
        		parseInt(date.split("-")[1])-1,
        		parseInt(date.split("-")[2])
      	  )
        )
        console.log(this.countd);
    	}

      this.cargando = false;
      
    })
      
  }

  callback(){

		if(this.render){

			this.render = false;

			Rating.fnc();
			CountDown.fnc();
			ProgressBar.fnc();
			Tabs.fnc();
		}
	}

}
