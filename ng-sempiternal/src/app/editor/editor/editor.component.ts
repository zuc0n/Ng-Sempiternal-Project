import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublishService } from '../publish.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  publishForm: FormGroup;
  submitted = false;
  constructor(private publishService: PublishService) { }

  ngOnInit() {
    this.publishForm = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      'article': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'body': new FormControl('', [Validators.required]),
      'tagList': new FormControl(''),
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.publishForm);
  }
}
