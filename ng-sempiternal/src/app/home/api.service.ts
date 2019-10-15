import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  feedUrl = 'https://conduit.productionready.io/api/articles';
  tagUrl = 'https://conduit.productionready.io/api/tags';
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


}
