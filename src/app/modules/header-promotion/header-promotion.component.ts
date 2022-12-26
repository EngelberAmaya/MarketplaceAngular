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
  H3 = '';
  Button = '';
  H4 = '';
  IMG = '';
  P1 = '';
  P2 = '';
  Span = '';

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
  
      //this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);
      this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);
      this.H3 = this.top_banner['H3-tag'];
      this.H4 = this.top_banner['H4-tag'];
      this.Button = this.top_banner['Button-tag'];
      this.P1 = this.top_banner['P1-tag'];
      this.P2 = this.top_banner['P2-tag'];
      this.Span = this.top_banner['Span-tag'];
      this.IMG = this.top_banner['IMG-tag'];
     
      this.preload = false;		
  
    })

  }

}
