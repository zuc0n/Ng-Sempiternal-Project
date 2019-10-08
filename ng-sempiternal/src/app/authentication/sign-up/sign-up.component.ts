import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

    this.authService.register(this.user.value.username, this.user.value.email, this.user.value.password).subscribe(
      (response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
      },
      err => console.log(err)
    );
  }

}
