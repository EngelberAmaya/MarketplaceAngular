import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient ) { }

	getCategories(){
		return this.http.get(`${environment.url}/categories.json`);
	}

	getFilterCategories(orderBy:String, equalTo:String){
		return this.http.get(`${environment.url}/categories.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
	}

	patchCategories(id:string, value:Object){
		return this.http.patch(`${environment.url}/categories/${id}.json`,value);
	}
	
}
