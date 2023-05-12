import { Component, OnInit } from '@angular/core';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faHeart = faHeart;
    faComment = faComment;

  constructor() { }

  ngOnInit(): void {
  }

}
