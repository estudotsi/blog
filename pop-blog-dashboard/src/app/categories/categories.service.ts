import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from './categories.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly url = 'http://localhost:3000/categories';
  category!: Categories;

  constructor(private http: HttpClient) { }

  createCategory(category: Categories):Observable<Categories>{
    return this.http.post<Categories>(this.url, category);
  }

  listCategory(){
    return this.http.get<Categories[]>(this.url);
  }

  updateCategory(category: Categories, id: number): Observable<Categories>{
    return this.http.put<Categories>(`${this.url}/${id}`, category);
  }

  deleteCategory(id: number){
    return this.http.delete<Categories>(`${this.url}/${id}`);
  }

}
