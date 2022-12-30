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

	getLimitProducts(startAt:string, limitToFirst:number){
		return this.http.get(`${environment.url}/products.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`);
	}

	getFilterDataWithLimit(orderBy:string, equalTo:string, limitToFirst:number){
		return this.http.get(`${environment.url}/products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&limitToFirst=${limitToFirst}&print=pretty`);
	}
}
