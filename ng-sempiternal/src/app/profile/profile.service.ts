import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Injectable()
export class ProfileService {
  api = 'https://conduit.productionready.io/api/';
  token = this.auth.getToken();
  username;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) { }

  getProfile(url) {
    return this.http.get((this.api + `profiles/${url}`), {
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8',
        Authorization: `Token ${this.token}`,
      })
    });
  }

  getListArtical(url) {
    return this.http.get((this.api + `articles?author=${url}&limit=5&offset=0`), {
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8',
        Authorization: `Token ${this.token}`,
      })
    });
  }

  getFavArtical(url) {
    return this.http.get((this.api + `articles?favorited=${url}&limit=5&offset=0`), {
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8',
        Authorization: `Token ${this.token}`,
      })
    });
  }
}

