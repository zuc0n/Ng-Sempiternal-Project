import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: Profile;
  articles;
  favAticles;
  username: string;
  curRoute: string;
  constructor(public profile: ProfileService, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(item => {
      console.log(item);
      this.username = item.get('username');
      this.profile.username = this.username;
      this.profile.getProfile(this.username).subscribe(data => {
        // tslint:disable-next-line:no-string-literal
        this.data = data['profile'];
      });
      this.profile.getListArtical(this.username).subscribe(data => {
        // tslint:disable-next-line:no-string-literal
        this.articles = data['articles'];
      });
    });
  }

}
