import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loginStatus
      .subscribe((res) => {
        console.log(res);
        this.currentUser = localStorage.getItem('currentUser');
      })
      this.currentUser = localStorage.getItem('currentUser');
  }

}
