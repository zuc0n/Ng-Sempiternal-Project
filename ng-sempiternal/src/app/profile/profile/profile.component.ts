import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';

export interface Profile {
  bio?: string;
  following: boolean;
  image: string;
  username: string;
}

export interface Data {
  profile: Profile;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: Profile;
  username: string;
  currentUser: string;
  followStatus;
  constructor(public profile: ProfileService, private route: ActivatedRoute, public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('username');
    this.route.paramMap.subscribe(item => {
      this.username = item.get('username');
      this.profile.username = item.get('username');
      this.profile.getProfile(this.username).subscribe((data: Data) => {
        console.log(data);
        this.followStatus = data.profile.following;
        // tslint:disable-next-line:no-string-literal
        this.data = data.profile;
        this.followStatus = data.profile.following;
      });
    });
  }

  follow() {
    if(localStorage.getItem('jwtToken')){
      this.profile.follow(this.username).subscribe((data: Data) => {
        console.log(data);
        this.followStatus = data.profile.following;
      })
    }else {
      this.router.navigate(['/signin'])
    }
  }

  unfollow() {
    this.profile.unfollow(this.username).subscribe((data: Data) => {
      console.log(data);
      this.followStatus = data.profile.following;
    })
  }

}
