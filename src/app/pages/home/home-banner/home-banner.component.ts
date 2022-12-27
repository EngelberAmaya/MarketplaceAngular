import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  banner_home: Array<any> = [];
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

      if (size > 5) {
        index = Math.floor(Math.random() * (size - 5));        
      }

      this.productsService.getLimitProducts(Object.keys(resp)[index], 5).pipe(takeUntil(this.unsubscribe2$))
        .subscribe((resp: any) => {
           
            for (const key in resp) {
              this.banner_home.push(JSON.parse(resp[key].horizontal_slider));
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
