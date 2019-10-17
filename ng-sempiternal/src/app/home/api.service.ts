import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  token = localStorage.getItem('jwtToken');
  feedUrl = 'https://conduit.productionready.io/api/articles';
  tagUrl = 'https://conduit.productionready.io/api/tags';
  yourFeedUrl = 'https://conduit.productionready.io/api/articles/feed';
  constructor(private http: HttpClient) { }

  feedArticle(offset, tag = ''): Observable<any> {
    return this.http.get(this.feedUrl, {
      params: {
        limit: '10',
        offset,
        tag
      }
    });
  }

  tagArticle(): Observable<any> {
    return this.http.get(this.tagUrl);
  }

  getFeed(offset): Observable<any> {
    return this.http.get(this.yourFeedUrl, {
      params: {
        limit: '10',
        offset,
      },
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8',
        Authorization: `Token ${this.token}`,
      })
    });
  }
}
