import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit, OnDestroy {

  top_banner: any;
	preload = false;
  unsubscribe$ = new Subject();
  img = '';
  category: any;
  url: any;

  constructor(private productsService: ProductsService) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }
  
  
  obtenerProductos(){
    this.preload = true;
  
    this.productsService.getProducts().pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) =>{
      
      
      // console.log("resp", resp[Object.keys(resp)[1]]);
  
      /*=============================================
      Tomar la longitud del objeto
      =============================================*/
  
      let i;
      let size = 0;
  
      for(i in resp){
  
        size++			
  
      }
  
      /*=============================================
      Generar un número aleatorio 
      =============================================*/
  
      let index = Math.floor(Math.random()*size);
  
      /*=============================================
      Devolvemos a la vista un banner aleatorio
      =============================================*/
  
      this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);
      //console.log(this.top_banner);
      this.category = resp[Object.keys(resp)[index]].category;
      this.url = resp[Object.keys(resp)[index]].url;
      
      this.img = this.top_banner['IMG tag'];
      //console.log(this.img);
     
      this.preload = false;		
  
    }, err => {
      console.log(err);
    })

  }

}
