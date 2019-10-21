import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component';
import { CommentComponent } from './comment/comment.component';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [EditorComponent, ArticleComponent, CommentComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
  ]
})
export class EditorModule { }
