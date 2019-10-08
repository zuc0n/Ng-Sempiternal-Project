import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  url = 'https://conduit.productionready.io/api';
  constructor(private httpClient: HttpClient) { }

  register(userName: string, eMail: string, passWord: string) {
    return this.httpClient.post(this.url + '/users', {
      user: {
        username: userName,
        email: eMail,
        password: passWord
      },
    }, {
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8'
      })
    });
  }
}
