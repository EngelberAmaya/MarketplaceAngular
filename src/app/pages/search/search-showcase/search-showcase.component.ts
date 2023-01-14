import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Rating, DinamicRating, DinamicReviews, DinamicPrice, Pagination, Tabs } from '../../../functions';

@Component({
  selector: 'app-search-showcase',
  templateUrl: './search-showcase.component.html',
  styleUrls: ['./search-showcase.component.css']
})
export class SearchShowcaseComponent implements OnInit {

  unsubscribe$ = new Subject();
  products:Array<any> = [];
  render = true;
  cargando = false;
  rating: Array<any> = [];
	reviews: Array<any> = [];
	price: Array<any> = [];
  params = '';
  page: any;
  productFound = 0;
	currentRoute = '';
	totalPage = 0;
  properties: Array<any> = ["category","name","store","sub_category","tags","title_list","url"];
	listProducts: Array<any> = [];

  constructor(private productsService: ProductsService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  obtenerProductos(){
    this.params = this.activateRoute.snapshot.params["param"].split("&")[0];
    this.page = this.activateRoute.snapshot.params["param"].split("&")[1];
    this.currentRoute = `search/${this.params}`
    this.cargando = true;

    this.properties.forEach(property => {
      this.productsService.getSearchProducts(property, this.params).pipe(takeUntil(this.unsubscribe$)).subscribe((resp:any) => {

        for (const key in resp) {
          this.listProducts.push(resp[key])
        }

        this.productsFnc(this.listProducts);
        //console.log(this.listProducts);
      }, err => {
        console.log(err);
      })
    })

    
  }

  productsFnc(response: any){

    if(response.length > 0){

      this.products = [];
      let getProducts:any = [];
      let total = 0;
  
      for (const key in response) {
        getProducts.push(response[key]);
        total++;		
      }
  
      this.productFound = total;
      this.totalPage = Math.ceil(total/6);
  
      getProducts.forEach((product, index) => {
  
        if(this.page == undefined){
          this.page = 1;
        }
  
        let first = Number(index) + (this.page * 6) - 6;
        let last = 6 * this.page;
  
        if (first < last) {
  
          if(getProducts[first] != undefined){
  
            this.products.push(getProducts[first]);
            this.rating.push(DinamicRating.fnc(getProducts[first]));					
            this.reviews.push(DinamicReviews.fnc(this.rating[index]));
            this.price.push(DinamicPrice.fnc(getProducts[first]));
            this.cargando = false;
          }
        }
      })
    } else {
      this.cargando = false;
    }

  }

  callback(){
    if(this.render){

      this.render = false;

      Rating.fnc();
      Pagination.fnc();
      Tabs.fnc();
    }  
  }

}
