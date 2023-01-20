import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice} from '../../../functions';

@Component({
  selector: 'app-product-right',
  templateUrl: './product-right.component.html',
  styleUrls: ['./product-right.component.css']
})
export class ProductRightComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  products: Array<any> = [];
  rating: Array<any> = [];
	reviews: Array<any> = [];
	price: Array<any> = [];
  render = true;
  cargando = false;

  constructor(private activateRoute: ActivatedRoute,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.obtenerInformacion();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.unsubscribe2$.next(true);
    this.unsubscribe2$.complete();
  }

  obtenerInformacion(){
    this.cargando = true;
    this.productsService.getFilterProducts("url", this.activateRoute.snapshot.params["param"])
      .pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) => {
         
        for (const key in resp) {
          this.productsService.getFilterProducts("store", resp[key].store)
            .pipe(takeUntil(this.unsubscribe2$)).subscribe((data: any) => {
              
              this.productsFnc(data);	
            })
        }
      })
  }

  productsFnc(response){
    this.products = [];
    let getProduct:any = [];

    for (const key in response) {
      getProduct.push(response[key]);     
    }

    getProduct.sort(function(a,b){
			return (b.sales - a.sales)
		})

    getProduct.forEach((product:any, index: number) => {

      if(index < 4){
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
