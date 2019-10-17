import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  url = 'https://conduit.productionready.io/api/user';
  token = this.auth.getToken();
  username = new Subject<string>();
  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  updateUser(newEmail: string, newBio: string, newImage: string, newUsername: string, newPassword: string) {
    return this.http.put(this.url, {
        user: {
          email: newEmail,
          bio: newBio,
          image: newImage,
          username: newUsername,
          password: newPassword
        }
    }, {
      headers: new HttpHeaders({
        'content-type': 'application/json; charset=utf-8',
        Authorization: `Token ${this.token}`,
      })
    });
  }

  signOut() {
    localStorage.clear();
    this.auth.isLoggedIn.emit(false);
    this.router.navigate(['/']);
  }

  sendUsername(username: string) {
    this.username.next(username);
  }

  getUsername() {
    return this.username.asObservable();
  }
}
