import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface Author {
  bio?: string;
  following?: boolean;
  image?: string;
  username?: string;
}

export interface Articles {
  author: Author;
  body?: string;
  createdAt?: string;
  description?: string;
  favorited?: boolean;
  favoritesCount?: number;
  slug?: string;
  tagList?: string[];
  title?: string;
  updatedAt?: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedsArticle;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.feedArticle().subscribe(data => {
      this.feedsArticle = data['articles'];
      console.log(this.feedsArticle);
    });
  }
}
