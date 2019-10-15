import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) { }
  status: boolean;
  user = JSON.parse(localStorage.getItem('user'));
  username = this.user.username;
  ngOnInit() {
    this.authService.isLoggedIn.subscribe(login => this.status = login)
    if (localStorage.getItem('jwtToken') != null) {
      this.status = true;
    }
  }
}
