import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Response } from '../log-in/log-in.component';
import { Errors } from '../errors';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required]),
  });
  submitted = false;
  errors: Errors;
  errorList: Array<string> = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    this.authService.register(this.user.value.username, this.user.value.email, this.user.value.password).subscribe(
      (res: Response) => {
        this.authService.isLoggedIn.emit(true);
        localStorage.setItem('bio', res.user.bio);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('image', res.user.image);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('jwtToken', res.user.token);
        localStorage.setItem('password', this.user.value.password);
        this.authService.sendUser(res.user);
        this.router.navigate(['/']);
      },
      (err) => {
        this.errors = err.error.errors;
        console.log(Object.keys(this.errors));
        for (const bug of Object.keys(this.errors)) {
          this.errorList.push(bug + ' ' + this.errors[bug]);
        }
        console.log(this.errorList);
      }
    );
  }
  clearError() {
    this.errorList = [];
  }
}
