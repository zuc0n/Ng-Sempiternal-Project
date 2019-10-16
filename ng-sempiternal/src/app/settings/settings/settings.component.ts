import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: FormGroup;
  password = localStorage.getItem('password');
  constructor(public setting: SettingsService, private auth: AuthService) { }

  ngOnInit() {
    console.log(this.auth.user);
    this.settings = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      'image': new FormControl(this.auth.user.image),
      // tslint:disable-next-line: object-literal-key-quotes
      'username': new FormControl(this.auth.user.username, Validators.required),
      // tslint:disable-next-line: object-literal-key-quotes
      'bio': new FormControl(this.auth.user.bio),
      // tslint:disable-next-line: object-literal-key-quotes
      'email': new FormControl(this.auth.user.email, [Validators.required, Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      'password': new FormControl(this.password, [Validators.required, Validators.minLength(8)])
    });
  }
  onSubmit() {
    console.log(this.settings.value);
    this.setting.updateUser(
      this.settings.value.email,
      this.settings.value.bio,
      this.settings.value.image,
      this.settings.value.username,
      this.settings.value.password).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      localStorage.setItem('user', JSON.stringify(data['user']));
      localStorage.setItem('password', this.settings.value.password);
    });
  }

  signOut() {
    this.setting.signOut();
  }
}
