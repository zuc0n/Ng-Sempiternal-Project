import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { User } from 'src/app/authentication/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: FormGroup;
  password = localStorage.getItem('password');
  user: User;
  constructor(public setting: SettingsService, private auth: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.settings = new FormGroup({
      'image': new FormControl(this.user.image),
      'username': new FormControl(this.user.username, Validators.required),
      'bio': new FormControl(this.user.bio),
      'email': new FormControl(this.user.email, [Validators.required, Validators.required]),
      'password': new FormControl(this.password, [Validators.required, Validators.minLength(8)])
    })
  }
  onSubmit () {
    console.log(this.settings.value);
    this.setting.updateUser(this.settings.value.email, this.settings.value.bio, this.settings.value.image, this.settings.value.username, this.settings.value.password).subscribe(data => {
      localStorage.setItem('user', JSON.stringify(data['user']));
      localStorage.setItem('password', this.settings.value.password) 
    })
  }

  signOut() {
    this.setting.signOut();
  }
}
