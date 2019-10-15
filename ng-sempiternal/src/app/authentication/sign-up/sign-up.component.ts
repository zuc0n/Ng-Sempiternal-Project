import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Response } from '../log-in/log-in.component';

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
        localStorage.setItem('jwtToken', res['user'].token);
        localStorage.setItem('password', this.user.value.password);
        localStorage.setItem('user', JSON.stringify(res['user']));
        this.router.navigate(['/']);
      },
      err => console.log(err)
    );
  }

}
