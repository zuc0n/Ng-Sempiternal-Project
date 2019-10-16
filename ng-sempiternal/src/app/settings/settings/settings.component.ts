import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/authentication/user';
import { Response } from 'src/app/authentication/log-in/log-in.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: FormGroup;
  password = localStorage.getItem('password');
  user: User;
  constructor(public setting: SettingsService, private router: Router) { }

  ngOnInit() {
    this.settings = new FormGroup({
      'image': new FormControl(localStorage.getItem('image')),
      'username': new FormControl(localStorage.getItem('username'), Validators.required),
      'bio': new FormControl(localStorage.getItem('bio')),
      'email': new FormControl(localStorage.getItem('email'), [Validators.required, Validators.required]),
      'password': new FormControl(localStorage.getItem('password'), [Validators.required, Validators.minLength(8)])
    })
  }
  onSubmit () {
    console.log(this.settings.value);
    this.setting.updateUser(this.settings.value.email, this.settings.value.bio, this.settings.value.image, this.settings.value.username, this.settings.value.password).subscribe((data: Response) => {
      localStorage.setItem('password', this.settings.value.password) ;
      localStorage.setItem('bio', data.user.bio);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('image', data.user.image);
        localStorage.setItem('username', data.user.username);
        this.setting.sendUsername(data.user.username);
        this.router.navigate(['/profile', data.user.username]);
    })
  }

  signOut() {
    this.setting.signOut();
  }
}
