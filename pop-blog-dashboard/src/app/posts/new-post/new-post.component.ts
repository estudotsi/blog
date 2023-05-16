import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Categories } from 'src/app/categories/categories.model';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Post } from 'src/app/models/post';
import { PostService } from './post.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImage: any;
  categories!: Categories[];
  postForm!: FormGroup;
  base64!: string;

  constructor(private categoriesService: CategoriesService,
    private fb: FormBuilder, private postService: PostService,
    private toastr: ToastrService,
     private router: Router,
     private route: ActivatedRoute)
    {

      this.route.queryParams.subscribe(data => console.log("Aqui: ", data))

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoriesService.listCategory().subscribe({
      next: (data) => this.categories = data,
      error: (error) => console.log(error),
      complete: () => console.log("completou")
    });
  }

  get fc(){
    return this.postForm.controls;
  }

  ontitleChanged($event: any){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
    console.log(this.permalink);
  }

  showPreview($event: any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
      console.log("Aqui: ", this.imgSrc);
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit(){
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      postImaTitle: this.imgSrc,
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeature: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
      categoryId: this.postForm.value.category
    }
    this.postService.createPost(postData).subscribe({
      next: data => console.log("ok add: ", data),
      error: error => console.log("Não ok", error),
      complete: () => {
        this.postForm.reset();
        this.imgSrc = './assets/placeholder-image.png';
        this.toastr.success("Post Inserido corretamente");
        this.router.navigate(['/posts']);
      }
    })
  }

}

