import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private http: HttpClient) { }

	getFilterData(orderBy: string, equalTo: string){
    return this.http.get(`${environment.url}/sub-categories.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
	}

  patchSubCategories(id:string, value:Object){
		return this.http.patch(`${environment.url}/sub-categories/${id}.json`,value);
	}
}
