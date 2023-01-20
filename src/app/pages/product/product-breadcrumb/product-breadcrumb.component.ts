import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-breadcrumb',
  templateUrl: './product-breadcrumb.component.html',
  styleUrls: ['./product-breadcrumb.component.css']
})
export class ProductBreadcrumbComponent implements OnInit, OnDestroy {

  breadcrumb = '';
  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();

  constructor(private activateRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.breadcrumb = this.activateRoute.snapshot.params["param"].replace(/[-]/g, " ");
    this.obtenerInformacion();
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.unsubscribe2$.next(true);
    this.unsubscribe2$.complete();
  }
  
  obtenerInformacion(){
    this.productsService.getFilterProducts("url", this.activateRoute.snapshot.params["param"])
      .pipe(takeUntil(this.unsubscribe$)).subscribe((resp1: any) => {

        for (const key in resp1) {
                  
          let id = Object.keys(resp1).toString();
          let value = {
            "views": Number(resp1[key].views + 1)
          }

          this.productsService.patchProducts(id, value).subscribe((resp) => {
            //console.log(resp);
          })
        }
      
    }, err => {
      console.log(err);
    })

  }

}
