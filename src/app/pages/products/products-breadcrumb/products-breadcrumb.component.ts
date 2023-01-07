import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';

@Component({
  selector: 'app-products-breadcrumb',
  templateUrl: './products-breadcrumb.component.html',
  styleUrls: ['./products-breadcrumb.component.css']
})
export class ProductsBreadcrumbComponent implements OnInit, OnDestroy {

  breadcrumb = null;
  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerInformacion();
  }
  
  obtenerInformacion(){
    let params = this.activateRoute.snapshot.params['param'].split("&")[0];
    console.log(params);
  
    this.categoriesService.getFilterCategories("url", params).pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) => {
  
      if(Object.keys(resp).length > 0){
  
        for (const key in resp) {
          this.breadcrumb = resp[key].name;          
        }
  
      } else {
  
        this.subCategoriesService.getFilterData("url", params).pipe(takeUntil(this.unsubscribe2$)).subscribe((resp2: any) => {
          for (const key in resp2) {
            this.breadcrumb = resp2[key].name;          
          }
        }, err => {
          console.log(err);
        })
  
      }      
  
    }, err => {
      console.log(err);
    })

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.unsubscribe2$.next(true);
    this.unsubscribe2$.complete();
  }

}
