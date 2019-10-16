import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { User } from '../authentication/user';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private setting: SettingsService) { }
  status: boolean;
  username: string;
  ngOnInit() {
    this.authService.isLoggedIn.subscribe((login) => {
      console.log('vao');
      this.status = login;
    });
    if (localStorage.getItem('jwtToken') != null) {
      this.status = true;
    }
    this.authService.getUser().subscribe((user: User) => {
      this.username = user.username;
    })
    this.setting.getUsername().subscribe((username: string) => {
      this.username = username;
    })
    this.username = localStorage.getItem('username');
  }
}
