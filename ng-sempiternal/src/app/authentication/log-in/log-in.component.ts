import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { Errors } from '../errors';

export interface Response {
  user: User;
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  submitted = false;
  errors: Errors;
  errorList: Array<string> = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.user.value);
    this.authService.login(this.user.value.email, this.user.value.password).subscribe(
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
