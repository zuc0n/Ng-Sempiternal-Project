import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  token = localStorage.getItem('jwtToken');
  url = 'https://conduit.productionready.io/api';
  isLoggedIn = new EventEmitter<boolean>(false);

  private user = new Subject<User>();

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

  getToken() {
    return this.token;
  }

  sendUser(user: User) {
    this.user.next(user);
  }

  clearUser() {
    this.user.next();
  }

  getUser() {
    return this.user.asObservable();
  }
}
