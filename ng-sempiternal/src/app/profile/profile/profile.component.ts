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
  username: string;
  currentUser: string;
  followStatus;
  constructor(public profile: ProfileService, private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user')).username;
    this.route.paramMap.subscribe(item => {
      this.username = item.get('username');
      this.profile.username = item.get('username');
      this.profile.getProfile(this.username).subscribe(data => {
        console.log(data);
        // tslint:disable-next-line:no-string-literal
        this.data = data['profile'];
        this.checkFollow(this.data.following);
      });
    });
  }

  follow() {
    this.profile.follow(this.username).subscribe(data => {
      console.log(data);
      this.checkFollow(data['profile'].following);
    })
  }

  checkFollow(status) {
    if(status) {
      this.followStatus = "Unfollow"
    }else {
      this.followStatus = "Follow"
    }
  }

}
