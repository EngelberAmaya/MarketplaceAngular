import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient ) { }

	getProducts(){
		return this.http.get(`${environment.url}/products.json`);
	}

	getFilterProducts(orderBy:string, equalTo:string){
		return this.http.get(`${environment.url}/products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
	}

	getLimitProducts(startAt:string, limitToFirst:number){
		return this.http.get(`${environment.url}/products.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`);
	}

	getFilterDataWithLimit(orderBy:string, equalTo:string, limitToFirst:number){
		return this.http.get(`${environment.url}/products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&limitToFirst=${limitToFirst}&print=pretty`);
	}

	getSearchProducts(orderBy:string, param:string){
		return this.http.get(`${environment.url}/products.json?orderBy="${orderBy}"&startAt="${param}"&endAt="${param}\uf8ff"&print=pretty`);
	}

	patchProducts(id:string, value:Object){
		return this.http.patch(`${environment.url}/products/${id}.json`,value);
		
	}
}
