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

  ngOnInit() {
  }

}
