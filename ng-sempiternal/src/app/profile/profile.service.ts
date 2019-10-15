import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Injectable()


export class ProfileService {
  api = 'https://conduit.productionready.io/api/';
  token = localStorage.getItem('jwtToken');
  username;

  constructor(private http: HttpClient, public auth: AuthService, private route: ActivatedRoute) { }

  getProfile(url) {
    return this.http.get((this.api + `profiles/${url}`));
  }

  getListArtical(url) {
    return this.http.get((this.api + `articles?author=${url}&limit=5&offset=0`));
  }

  getFavArtical(url) {
    return this.http.get((this.api + `articles?favorited=${url}&limit=5&offset=0`));
  }

  follow(username) {
    return this.http.post((this.api + `profiles/${username}/follow`),{
      
    }, {
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8',
        'Authorization': `Token ${this.token}`,
      })
    });
  }


  unfollow(username) {
    return this.http.delete((this.api + `profiles/${username}/follow`),{
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8',
        'Authorization': `Token ${this.token}`,
      })
    });
  }
}

