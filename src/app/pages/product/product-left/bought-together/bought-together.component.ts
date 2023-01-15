import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { DinamicPrice  } from '../../../../functions';

@Component({
  selector: 'app-bought-together',
  templateUrl: './bought-together.component.html',
  styleUrls: ['./bought-together.component.css']
})
export class BoughtTogetherComponent implements OnInit {

  @Input() childItem: any;
  unsubscribe$ = new Subject();
  products: Array<any> = [];
  total = 0;
  price: Array<any> = [];
	render = true;
  offerEnvio: any;
  offer2: any;
  value = 0;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  obtenerProducto(){
    this.productsService.getFilterProducts("title_list", this.childItem["title_list"]).pipe(takeUntil(this.unsubscribe$))
      .subscribe((resp: any) => {
        this.productsFnc(resp);
      })
  }

  productsFnc(response: any){

    this.products.push(this.childItem);
    let getProduct:any = [];

    for (const key in response) {
      getProduct.push(response[key]);     
    }

    getProduct.sort(function(a: any,b: any){
			return (b.views - a.views)
		})

    getProduct.forEach((product: any, index: number) => {
      if (index < 1) {
        this.products.push(product);
      }
    })
    
    for (const key in this.products) {

      this.price.push(DinamicPrice.fnc(this.products[key]));
      
      if (this.products[key].offer != "") {
        
        let today = new Date();
        let offerDate = new Date(parseInt(JSON.parse(this.products[key].offer)[2].split("-")[0]),
                                parseInt(JSON.parse(this.products[key].offer)[2].split("-")[1])-1,
                                parseInt(JSON.parse(this.products[key].offer)[2].split("-")[2]));
                           
        let type = JSON.parse(this.products[key].offer)[0];
        this.value = JSON.parse(this.products[key].offer)[1];

        if (today < offerDate) {

          if (type == "Disccount") {
            this.offerEnvio = (this.products[key].price - (this.products[key].price * this.value/100)).toFixed(2);
          }
          
          if (type == "Fixed") {
            this.offerEnvio = this.products[key].price;            
          }
          
        } else {
          this.offerEnvio = this.products[key].price;
        }        

        this.products[key].total = Number(this.offerEnvio);
        
      }

    }

    this.total = this.products.map(m => m.total).reduce((a, b) => a + b, 0); 

  }


}
