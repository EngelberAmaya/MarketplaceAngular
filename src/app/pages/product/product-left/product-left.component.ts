import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice } from '../../../functions';;

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
      this.cargando = false;
      
    })
      
  }

}
