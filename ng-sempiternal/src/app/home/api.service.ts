import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://conduit.productionready.io/api/articles';
  constructor(private http: HttpClient) { }

  feedArticle(): Observable<any> {
    return this.http.get(this.url, {
      params: { }
    });
  }
}
