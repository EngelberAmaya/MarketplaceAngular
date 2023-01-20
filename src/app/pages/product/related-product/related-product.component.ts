import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice, OwlCarouselConfig, CarouselNavigation } from '../../../functions';


@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {

  products: Array<any> = [];
  rating: Array<any> = [];
  reviews: Array<any> = [];
  price: Array<any> = [];
  render = true;
  cargando = false;
  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();

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
      .pipe(takeUntil(this.unsubscribe$)).subscribe( resp => { 

  			for(const i in resp){
  				
  				this.productsService.getFilterProducts("category", resp[i].category)
          .pipe(takeUntil(this.unsubscribe2$)).subscribe( resp => {
  					
  					this.productsFnc(resp);		

  				})

  			}

  		}) 
  }

  productsFnc(response){

      this.products = [];
      let getProduct:any = [];
  
      for(const i in response){
  
        getProduct.push(response[i]);						
          
      }
  
      getProduct.sort(function(a:any,b:any){
        return (b.views - a.views)
      })
  
    getProduct.forEach((product: any, index: number)=>{
  
      if(index < 10){
  
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
  
        setTimeout(function(){
          OwlCarouselConfig.fnc();
				  CarouselNavigation.fnc();
          Rating.fnc();
        },1000)
  
      }
  }

}
