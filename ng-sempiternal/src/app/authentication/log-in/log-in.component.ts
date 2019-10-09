import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  submitted = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.user.value);
    this.authService.login(this.user.value.email, this.user.value.password).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
