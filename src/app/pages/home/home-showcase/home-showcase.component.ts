import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';

@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.css']
})
export class HomeShowcaseComponent implements OnInit {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  unsubscribe3$ = new Subject();
  categories: Array<any> = [];
  cargando = false;
  render = true;
  listFiltro: any[] = [];
  listProducts: any[] = [];
  offer: any;
  rating = 0;
  value = 0;
  descuento = 0;

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.unsubscribe2$.next(true);
    this.unsubscribe2$.complete();
    this.unsubscribe3$.next(true);
    this.unsubscribe3$.complete();
  }

  obtenerCategorias(){
    let getCategories: any[] = [];

    this.cargando = true;

    this.categoriesService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) => {

      for (const key in resp) {
         getCategories.push(resp[key])
      }

      getCategories.sort(function(a: any,b: any) {
          return(b.view - a.view)
      })

      getCategories.forEach((category, index) => {
        if (index < 6) {
          this.categories[index] = getCategories[index];
          this.cargando = false;
        }
      })
      
    }, err => {
      console.log(err);
    });
  }

  callback(){
    if (this.render) {
      this.render = false;
      let arraySubCategories: any = [];
      let arrayProducts: any = [];

      

      this.categories.forEach(category => {

        this.subCategoriesService.getFilterData("category", category.name).pipe(takeUntil(this.unsubscribe2$))
            .subscribe((resp:any) => {
              //console.log('resp obtenerFiltroProductos', resp);

              for (const key in resp) {

                arraySubCategories.push({
    							"category": resp[key].category,
    							"subcategory": resp[key].name,
    							"url": resp[key].url    
    						})
                
              }

              this.listFiltro = arraySubCategories;

              this.listFiltro.forEach(data => {
                this.obtenerFiltroSubcategoria(data.category);
              })

              
            }, err => {
              console.log(err);
            })

        this.productsService.getFilterDataWithLimit("category",category.url, 6).pipe(takeUntil(this.unsubscribe2$))
            .subscribe((resp: any) => {

            for (const key in resp) {
              
              if (resp[key].offer != "") {

                let type = JSON.parse(resp[key].offer)[0];
                this.value = JSON.parse(resp[key].offer)[1];
                
                if (type == "Disccount") {
                  this.offer = (resp[key].price - (resp[key].price * this.value/100)).toFixed(2);
                  this.descuento =  Number(this.value);
                }

                if (type == "Fixed") {
                  this.offer = this.value;
                  this.descuento = Math.round((this.offer*100)/resp[key].price);
                }
                
              }

              let totalReview = 0;
							for(let f = 0; f < JSON.parse(resp[key].reviews).length; f++){

								totalReview += Number(JSON.parse(resp[key].reviews)[f]["review"])
								
							}

              this.rating = Math.round(totalReview/JSON.parse(resp[key].reviews).length);             

              arrayProducts.push({
                
                "category": resp[key].category,
  							"url": resp[key].url,
  							"name": resp[key].name,
  							"image": resp[key].image,
  							"price": resp[key].price,
  							"offer": resp[key].offer,
  							"reviews": resp[key].reviews,
  							"stock": resp[key].stock,
  							"vertical_slider": resp[key].vertical_slider,
                "oferta": this.offer,
                "descuento": this.descuento

  						})

  
              this.listProducts = arrayProducts;
            }
            this.obtenerFiltroProductos(category.url);
            
            //console.log(this.obtenerFiltroProductos(category.url));

        }, err => {
          console.log(err);
        })
      })
    }
  }

  obtenerFiltroSubcategoria(category: string){
    return this.listFiltro.filter((data: any) => data.category == category);
  }

  obtenerFiltroProductos(category: string){
    return this.listProducts.filter((data: any) => data.category == category);
  }

}
