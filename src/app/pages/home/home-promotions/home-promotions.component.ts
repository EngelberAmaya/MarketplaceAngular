import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-promotions',
  templateUrl: './home-promotions.component.html',
  styleUrls: ['./home-promotions.component.css']
})
export class HomePromotionsComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  banner_default: Array<any> = [];
  category: Array<any> = [];
  url: Array<any> = [];
  render = true;
  preload = false;

  constructor(private productsService: ProductsService) { }

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
    this.preload = true;
    let index = 0;
  
    this.productsService.getProducts().pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) =>{
      
      let size = 0;
  
      for(let i in resp){
        size++			
      }

      if (size > 2) {
        index = Math.floor(Math.random() * (size - 2));        
      }

      this.productsService.getLimitProducts(Object.keys(resp)[index], 2).pipe(takeUntil(this.unsubscribe2$))
        .subscribe((resp: any) => {
           //console.log(resp);
            for (const key in resp) {
              this.banner_default.push(resp[key].default_banner);
					    this.category.push(resp[key].category);
					    this.url.push(resp[key].url);

              this.preload = false;
            }
        })
  
    }, err => {
      console.log(err);
    })

  }

}
