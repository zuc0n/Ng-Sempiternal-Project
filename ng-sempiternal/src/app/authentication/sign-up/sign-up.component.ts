import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
      (res) => {
        this.authService.isLoggedIn.emit(true);
        // tslint:disable-next-line: no-string-literal
        this.authService.user = res['user'];
        // tslint:disable-next-line: no-string-literal
        localStorage.setItem('jwtToken', res['user'].token);
        localStorage.setItem('password', this.user.value.password);
        this.router.navigate(['/']);
      },
      err => console.log(err)
    );
  }

}
