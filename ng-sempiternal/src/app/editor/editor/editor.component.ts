import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublishService } from '../publish.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  slug;
  publishForm: FormGroup;
  submitted = false;
  constructor(private publishService: PublishService, private router: Router) { }

  ngOnInit() {
    this.publishForm = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      'article': new FormControl('', [Validators.required, Validators.minLength(1)]),
      // tslint:disable-next-line: object-literal-key-quotes
      'description': new FormControl('', [Validators.required, Validators.minLength(1)]),
      // tslint:disable-next-line: object-literal-key-quotes
      'body': new FormControl('', [Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      'tagList': new FormControl(''),
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.publishForm);
    this.publishService.publish(
      this.publishForm.value.article,
      this.publishForm.value.description,
      this.publishForm.value.body,
      this.publishForm.value.tagList
      ).subscribe(
      (res) => {
        console.log(res);

        // tslint:disable-next-line: no-string-literal
        this.router.navigate(['/article', res['article'].slug]);
      },
      err => console.log(err)
    );
  }

  canDeactive(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.publishForm.dirty && this.submitted === false) {
      return confirm('Your changes are unsaved!! Do you like to exit ?');
    }
    return true;
  }
}
