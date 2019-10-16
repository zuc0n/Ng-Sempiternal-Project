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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': `Token ${this.token}`,
    })
  };
  constructor(private httpClient: HttpClient) { }

  publish(tItile: string, dEscription: string, bOdy: string, tagLIsh: string[]) {
    return this.httpClient.post(this.articlesUrl, {
      article: {
        title: tItile,
        description: dEscription,
        body: bOdy,
        tagLish: tagLIsh
      }
    }, this.httpOptions);
  }

  getArticle(slug: string) {
    return this.httpClient.get(`${this.articlesUrl}/${slug}`, this.httpOptions);
  }

  getComment(slug: string) {
    return this.httpClient.get(`${this.articlesUrl}/${slug}/comments`, this.httpOptions);
  }

  postComment(slug: string, comment) {
    return this.httpClient.post(`${this.articlesUrl}/${slug}/comments`, comment, this.httpOptions);
  }

  deleteComment(slug: string, id: string) {
    return this.httpClient.delete(`${this.articlesUrl}/${slug}/comments/${id}`, this.httpOptions);
  }
  follow(username: string) {
    return this.httpClient.post(`${this.articlesUrl}/${username}/follow`, this.httpOptions);
  }

  unfollow(username: string) {
    return this.httpClient.delete(`${this.articlesUrl}/${username}/follow`, this.httpOptions);
  }

  deleteArticle(slug: string) {
    return this.httpClient.delete(`${this.articlesUrl}/${slug}`, this.httpOptions);
  }
}
