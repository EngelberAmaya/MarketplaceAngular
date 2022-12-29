import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home-top-categories',
  templateUrl: './home-top-categories.component.html',
  styleUrls: ['./home-top-categories.component.css']
})
export class HomeTopCategoriesComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  categories: Array<any> = [];
  cargando = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
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

}
