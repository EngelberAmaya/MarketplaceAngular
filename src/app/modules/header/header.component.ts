import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { Search } from '../../functions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject();
  unsubscribe2$ = new Subject();
  listCategories: any[] = [];
  arrayTitleList: Array<any> = [];
  render = true;
  arrayTitleName: any[] = [];
  listFiltro: any[] = [];

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService,
              private router: Router) { }

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
      this.listCategories = resp;
      //console.log(this.listCategories);
      this.listCategories.forEach((data: any, index:number) => {
        this.arrayTitleList.push(JSON.parse(data.title_list));
        
      })
    }, err => {
      console.log(err);
    });
  }

  obtenerSubCategorias(){
    if (this.render) {
      this.render = false;
      let arraySubCategories:any[] = [];

      this.arrayTitleList.forEach(data => {
        for (const iterator of data) {
          this.subCategoriesService.getFilterData("title_list", iterator).pipe(takeUntil(this.unsubscribe2$))
            .subscribe((resp: any) => {
              arraySubCategories.push(resp);
              let arrayTitleName:any = [];

              for (let item in arraySubCategories) {
                //console.log('item', arraySubCategories[item]);
                for (const key in arraySubCategories[item]) {

                  arrayTitleName.push(
                    {
                      "titleList": arraySubCategories[item][key].title_list,
									    "subcategory": arraySubCategories[item][key].name,
                      "url": arraySubCategories[item][key].url
                    }
                  )
                  
                }
              }

              this.listFiltro = arrayTitleName;

              //console.log('arrayTitleName', this.listFiltro);
              this.obtenerFiltroSubcategoria(iterator);
            
            }, err => {
              console.log(err);
            })
        }
      })
    }
  }

  obtenerFiltroSubcategoria(subcategoria: string){
    return this.listFiltro.filter((data: any) => data.titleList == subcategoria);
  }

  buscar(value: string){

    if (value.length == 0  || Search.fnc(value) == undefined) {
      return;
    }

    this.router.navigate(['search', Search.fnc(value)]);
  }

}
