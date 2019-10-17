import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublishService } from '../publish.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  tagLists = [];
  idArticle: string;
  constructor(private publishService: PublishService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.publishForm = new FormGroup({
      // tslint:disable-next-line: object-literal-key-quotes
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      // tslint:disable-next-line: object-literal-key-quotes
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      // tslint:disable-next-line: object-literal-key-quotes
      body: new FormControl('', [Validators.required]),
      // tslint:disable-next-line: object-literal-key-quotes
      tagList: new FormControl(''),
    });

    this.activated.paramMap.subscribe(id => {
      this.idArticle = id.get('slug');
      if (this.idArticle !== null) {
        this.publishService.getArticle(this.idArticle).subscribe(data => {
          console.log(data);
          this.publishForm.controls.title.setValue(data['article'].title);
          this.publishForm.controls.body.setValue(data['article'].body);
          this.publishForm.controls.description.setValue(data['article'].description);
        });
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.publishForm);
    this.publishService.publish(
      this.publishForm.value.title,
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

  handleTag() {
    if (this.publishForm.value.tagList === '') {
      return;
    }
    this.tagLists.push(this.publishForm.value.tagList);
    this.publishForm.controls.tagList.setValue('');
  }
}
