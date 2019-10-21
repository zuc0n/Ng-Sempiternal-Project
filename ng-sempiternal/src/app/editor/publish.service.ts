import { Injectable } from '@angular/core';
import { User } from '../authentication/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublishService {
  user: User = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('jwtToken');
  articlesUrl = 'https://conduit.productionready.io/api/articles';
  profileUrl = 'https://conduit.productionready.io/api/profiles';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': `Token ${this.token}`,
    })
  };
  constructor(private httpClient: HttpClient) { }

  publishArticle(data: any) {
    return this.httpClient.post(this.articlesUrl, data, this.httpOptions);
  }

  getArticle(slug: string) {
    return (this.token) ? this.httpClient.get(`${this.articlesUrl}/${slug}`, this.httpOptions) :
      this.httpClient.get(`${this.articlesUrl}/${slug}`)
    ;
  }

  getArticleNoAuth(slug: string) {
    return (this.token) ? this.httpClient.get(`${this.articlesUrl}/${slug}`) :
      this.httpClient.get(`${this.articlesUrl}/${slug}`)
    ;
  }

  editArticle(slug: string, data: any) {
    return this.httpClient.put(`${this.articlesUrl}/${slug}`, data , this.httpOptions);
  }
  deleteArticle(slug: string) {
    return this.httpClient.delete(`${this.articlesUrl}/${slug}`, this.httpOptions);
  }

  getComment(slug: string) {
    return (this.token) ? this.httpClient.get(`${this.articlesUrl}/${slug}/comments`, this.httpOptions) :
      this.httpClient.get(`${this.articlesUrl}/${slug}`)
    ;
  }

  postComment(slug: string, comment) {
    return this.httpClient.post(`${this.articlesUrl}/${slug}/comments`, comment, this.httpOptions);
  }

  deleteComment(slug: string, id: string) {
    return this.httpClient.delete(`${this.articlesUrl}/${slug}/comments/${id}`, this.httpOptions);
  }

  follow(username: string) {
    return this.httpClient.post(`${this.profileUrl}/${username}/follow`, {}, this.httpOptions);
  }

  unfollow(username: string) {
    return this.httpClient.delete(`${this.profileUrl}/${username}/follow`, this.httpOptions);
  }

  favoriteArticle(slug) {
    return this.httpClient.post(`${this.articlesUrl}/${slug}/favorite`, {}, this.httpOptions);
  }

  unFavoriteArticle(slug) {
    return this.httpClient.delete(`${this.articlesUrl}/${slug}/favorite`, this.httpOptions);
  }

}
