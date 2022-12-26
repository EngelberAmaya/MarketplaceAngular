import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  categories: any[] = [];
  render = true;
  categoriesList:Array<any> = [];
  listFiltro: any[] = [];

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    this.unsubscribe2$.next(true);
    this.unsubscribe2$.complete();
  }

  obtenerCategorias(){
    this.categoriesService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) => {
      this.categories = resp;
      //console.log(resp);
      this.categories.forEach(data => {
        this.categoriesList.push(data.name);
      })

    }, err => {
      console.log(err);
    })

  }

  obtenerSubCategorias(){
    if (this.render) {
      this.render = false;
      let arraySubCategories: any[] = [];
      
      this.categoriesList.forEach(data => {
        
        this.subCategoriesService.getFilterData("category", data).pipe(takeUntil(this.unsubscribe2$))
          .subscribe((resp: any) => {

            for (let key in resp) {
              
              arraySubCategories.push(
                {
                  "category": resp[key].category,
                  "subcategory": resp[key].name,
                  "url": resp[key].url
                }
              )
            }

            this.listFiltro = arraySubCategories;

            this.listFiltro.forEach(data => {
              this.obtenerFiltroSubcategoria(data.category);
            })


          })
      })
    }
  }

  obtenerFiltroSubcategoria(category: string){
    return this.listFiltro.filter((data: any) => data.category == category);
  }

}
