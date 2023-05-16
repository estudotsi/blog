import { Component, OnInit } from '@angular/core';
import { PostService } from '../new-post/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  posts!: any[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.listPost().subscribe({
      next: (data) =>{
        this.posts = data,
        console.log("Aqui: ", this.posts);
      },
      error: (error) => console.log(error),
      complete: () => console.log("completou")
    });
  }

}
