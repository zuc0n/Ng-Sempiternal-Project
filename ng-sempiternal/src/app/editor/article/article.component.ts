import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PublishService } from '../publish.service';
import { FormGroup, FormControl } from '@angular/forms';

interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
interface Article {
  article: {
    author: Author;
    body: string;
    createdAt: Date;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: Array<string>;
    title: string;
    updatedAt: Date;
  };
}

interface Comment {
  comments: [{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    author: Author;
  }];
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article;
  getSlug;
  comments;
  newComment;
  isAuthor: boolean;
  commentForm = new FormGroup({
    body: new FormControl('')
  });
  renderFollow: string;
  renderFavorite: string;
  username: string = localStorage.getItem('user');
  articlesUrl = 'https://conduit.productionready.io/api/articles/';
  constructor(private route: ActivatedRoute, private http: HttpClient, private publish: PublishService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getSlug = params.get('slug');
    });

    this.publish.getArticle(this.getSlug).subscribe((article: Article) => {
      this.article = article.article;
    });

    this.publish.getComment(this.getSlug).subscribe((comment: Comment) => {
      this.comments = comment.comments;
      console.log(this.comments);
    });
    // this.renderFollow = this.article.author.following ? 'UnFollow' : 'Follow';
    // this.renderFavorite = this.article.favorited ? 'Unfavorite' : 'Favorite';
  }

  handleComment() {
    this.newComment = {
      comment: this.commentForm.value
    };
    console.log(this.newComment);
    this.publish.postComment(this.getSlug, this.newComment).subscribe();
    this.publish.getComment(this.getSlug).subscribe((comment: Comment) => {
      this.comments = comment.comments;
      console.log(this.comments);
    });
  }

  handleDeleteComment(id) {
    this.publish.deleteComment(this.getSlug, id).subscribe();
    this.publish.getComment(this.getSlug).subscribe((comment: Comment) => {
      this.comments = comment.comments;
      console.log(this.comments);
    });
  }
}
