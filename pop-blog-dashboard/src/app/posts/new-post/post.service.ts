import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly url = 'https://localhost:7286/Posts';
  post!: Post;

  constructor(private http: HttpClient) { }

  createPost(post: Post):Observable<Post>{
    return this.http.post<Post>(this.url, post);
  }

  listPost():Observable<Post[]>{
    return this.http.get<Post[]>(this.url);
  }

}







