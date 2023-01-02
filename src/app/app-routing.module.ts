import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchComponent } from './pages/search/search.component';
import { Ruta404Component } from './pages/ruta404/ruta404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
	{ path: 'products/:param', component: ProductsComponent },
	{ path: 'product/:param', component: ProductComponent },
	{ path: 'search/:param', component: SearchComponent },
	{ path: '**', pathMatch:'full', component: Ruta404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
