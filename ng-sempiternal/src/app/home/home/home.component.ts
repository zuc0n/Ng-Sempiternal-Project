import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { ProfileService } from 'src/app/profile/profile.service';

export interface Author {
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
export interface Res {
  articles: Articles[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listArticle: Articles[];
  listTags;
  global = true;
  offset = 0;
  countArticles: number;
  countPages: number;
  checkTabTag = false;
  nameTag: string;
  pages = [];
  tagPages = [];
  currentIndex = 0;
  localstorage = false;
  loginStatus: boolean;

  constructor(private apiService: ApiService, private router: Router, private auth: AuthService, private profile: ProfileService) { }

  ngOnInit() {
    this.apiService.feedArticle(this.offset).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.listArticle = data['articles'];
      console.log(this.listArticle);
      // tslint:disable-next-line: no-string-literal
      this.countArticles = data['articlesCount'];
      this.countPages = Math.ceil(this.countArticles / 10);
      for (let i = 1; i <= this.countPages; i++) {
        this.pages.push(i);
      }
    });

    this.apiService.tagArticle().subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.listTags = data['tags'];
    });
    if (localStorage.getItem('jwtToken') !== null) {
      this.localstorage = true;
      this.loginStatus = true;
    }

    this.auth.isLoggedIn.subscribe(data => {
      console.log(data);
      this.loginStatus = data;
    });
  }

  handleTag(tag) {
    this.apiService.feedArticle(this.offset, tag).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.listArticle = data['articles'];
      // tslint:disable-next-line: no-string-literal
      this.countArticles = data['countArticles'];
      console.log(this.listArticle, this.countArticles);
      // tslint:disable-next-line: no-string-literal
      this.countArticles = data['articlesCount'];
      this.countPages = Math.ceil(this.countArticles / 10);
      for (let i = 1; i <= this.countPages; i++) {
        this.tagPages.push(i);
      }
    });

    this.checkTabTag = true;
    this.nameTag = tag;
    this.global = false;
  }

  handleGlobal() {
    this.global = true;
    this.checkTabTag = false;
    this.apiService.feedArticle(this.offset).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.listArticle = data['articles'];
    });
  }

  handlePagination(i) {
    this.apiService.feedArticle(i).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.listArticle = data['articles'];
    });
    this.currentIndex = i;
  }

  handleFavorite(favor) {
    if (!localStorage.getItem('jwtToken')) {
      this.router.navigate(['/signin']);
    } else {
      if (favor === true) {
        favor.favoritesCount--;
      }
    }
  }
  handleYourFeed() {
    this.apiService.getFeed(this.offset).subscribe((data: Res) => {
      this.listArticle = data.articles;
      this.global = false;
    });


  }
  handleArticle() {
    this.router.navigate(['/article']);
  }

  handleClick(status, slug, index) {
    this.listArticle = this.listArticle.map((item, i) => {
      if (i == index) {
        item.favorited = !item.favorited;
        status? item.favoritesCount-- : item.favoritesCount++;
      }
      return item;
    })
    status ? this.unfav(slug) : this.fav(slug);
  }
  fav(slug) {
    this.profile.favourite(slug).subscribe();
  }
  unfav(slug) {
    this.profile.unfavourite(slug).subscribe();
  }
}
