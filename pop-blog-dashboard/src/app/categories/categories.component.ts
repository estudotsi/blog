import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CategoriesService } from './categories.service';
import { ToastrService } from 'ngx-toastr';
import { Categories } from './categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories!: Categories [];
  formCategory!: string;
  formStatus: string ='Add';
  categoryIdToUpdate!: number;
  categoryUpdate!: Categories;

  constructor(private service: CategoriesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.listCategory().subscribe({
      next: data => console.log(this.categories = data),
      error: error => console.log("Não ok", error),
      complete: () => console.log("")
    });
  }

  onSubmit(categoryForm: NgForm){
    if(this.formStatus == 'Add'){
      this.service.createCategory(categoryForm.value).subscribe({
        next: data => console.log("ok add: ", data),
        error: error => console.log("Não ok", error),
        complete: () => {
          this.toastr.success("Inserido corretamente");
          this.ngOnInit();
          this.formCategory = "";
        }
      });
    }
    else if(this.formStatus == 'Edit')
    {
      console.log("Aqui: ",categoryForm.value.id);
      this.service.updateCategory(categoryForm.value, this.categoryIdToUpdate).subscribe({
        next: data => console.log("ok edit: ", data),
        error: error => console.log("Não ok", error),
        complete: () => {
          this.toastr.success("Alterado corretamente");
          this.ngOnInit();
          this.formStatus = "Add";
          this.formCategory = "";
        }
      });
    }

  }

  onEdit(category: Categories){
    this.formCategory = category.nome;
    this.formStatus = 'Edit';
    this.categoryIdToUpdate = category.id
  }

  onDelete(id: number){
    this.service.deleteCategory(id).subscribe({
      next: data => console.log("ok del: ", data),
      error: error => console.log("Não ok", error),
      complete: () => {
        this.toastr.success("Deletado corretamente");
        this.ngOnInit();
        this.formStatus = "Add";
        this.formCategory = "";
      }
    });
  }
}
