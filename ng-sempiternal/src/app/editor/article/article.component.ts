import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  token = localStorage.getItem('jwtToken');
  username: string = localStorage.getItem('username');
  articlesUrl = 'https://conduit.productionready.io/api/articles/';
  constructor(private route: ActivatedRoute, private http: HttpClient, private publish: PublishService, private router: Router) { }

  ngOnInit() {
    console.log(this.username);
    this.route.paramMap.subscribe(params => {
      this.getSlug = params.get('slug');
    });

    this.publish.getArticle(this.getSlug).subscribe((article: Article) => {
      if (article.article.author.username !== this.username) {
        this.isAuthor = false;
        console.log(this.isAuthor);
      } else {
        this.isAuthor = true;
      }
      this.article = article.article;

      this.renderFollow = this.article.author.following ? 'UnFollow' : 'Follow';
      this.renderFavorite = this.article.favorited ? 'Unfavorite' : 'Favorite';
    });

    this.publish.getComment(this.getSlug).subscribe((comment: Comment) => {
      this.comments = comment.comments;
      console.log(this.comments);
    });

    if (this.username === null) {
      this.publish.getArticleNoAuth(this.getSlug).subscribe((article: Article) => {
        this.renderFollow = this.article.author.following ? 'UnFollow' : 'Follow';
        this.renderFavorite = this.article.favorited ? 'Unfavorite' : 'Favorite';
      });
    }
  }

  handleComment() {
    this.newComment = {
      comment: this.commentForm.value
    };
    this.publish.postComment(this.getSlug, this.newComment).subscribe(data => {
      this.publish.getComment(this.getSlug).subscribe((comment: Comment) => {
        this.comments = comment.comments;
      });
    });
    this.commentForm.controls.body.setValue('');
  }

  handleDeleteComment(id: string) {
    this.publish.deleteComment(this.getSlug, id).subscribe(data => {
      this.publish.getComment(this.getSlug).subscribe((comment: Comment) => {
        this.comments = comment.comments;
      });
    });
  }

  handleEditArticle() {
    this.router.navigate(['/editor', this.getSlug]);
  }

  handleDeleteArticle() {
    this.publish.deleteArticle(this.getSlug).subscribe(data => {
      this.router.navigate(['']);
    });
  }

  handleFollow(follow: string, username: string) {
    if (!(this.token === null ? false : true)) {
      return this.router.navigate(['/signin']);
    }

    this.renderFollow = follow ? 'Follow' : 'Unfollow';
    this.article.author.following = !follow;
    this.article.author.following
    ? this.publish.follow(username).subscribe()
    : this.publish.unfollow(username).subscribe();
  }

  handleFavorite(checkFavorite: string) {
    if (!(this.token === null ? false : true)) {
      return this.router.navigate(['/signin']);
    }

    this.renderFavorite = checkFavorite ? 'Favorite' : 'Unfavorite';
    checkFavorite ? this.article.favoritesCount-- : this.article.favoritesCount++;
    this.article.favorited = !checkFavorite;
    this.article.favorited
    ? this.publish.favoriteArticle(this.getSlug).subscribe()
    : this.publish.unFavoriteArticle(this.getSlug).subscribe();
  }
}
