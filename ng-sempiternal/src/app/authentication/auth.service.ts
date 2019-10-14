import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable()
export class AuthService {
  user: User = JSON.parse(localStorage.getItem('user'));
  token = localStorage.getItem('jwtToken');
  url = 'https://conduit.productionready.io/api';
  isLoggedIn = new EventEmitter<boolean>(false);
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

  login(eMail: string, passWord: string) {
    return this.httpClient.post(this.url + '/users/login', {
      user: {
        email: eMail,
        password: passWord
      }
    }, {
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8'
      })
    });
  }

  getUsername() {
    return this.user.username;
  }
  getToken() {
    return this.token;
  }
}
