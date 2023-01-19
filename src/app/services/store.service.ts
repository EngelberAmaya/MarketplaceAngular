import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http:HttpClient) { }

  getStores(){
		return this.http.get(`${environment.url}/stores.json`);
	}

	getFilterStores(orderBy:string, equalTo:string){
		return this.http.get(`${environment.url}/stores.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
	}

}
