import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) { }
  status: boolean;
  username = localStorage.getItem('username');
  ngOnInit() {
    this.authService.isLoggedIn.subscribe((login) => {
      console.log('vao');
      this.status = login;
      this.username = localStorage.getItem('username');
    });
    if (localStorage.getItem('jwtToken') != null) {
      this.status = true;
    }
  }
}
