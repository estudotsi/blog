import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories } from 'src/app/categories/categories.model';
import { CategoriesService } from 'src/app/categories/categories.service';
import { Post } from 'src/app/models/post';

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

  constructor(private categoriesService: CategoriesService, private fb: FormBuilder) {
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
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit(){
    let splitted = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category:{
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeature: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    console.log(postData);
  }

}
