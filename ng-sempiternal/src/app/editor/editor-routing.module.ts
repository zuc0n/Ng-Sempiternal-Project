import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component';
import { CanDeactivateGuard } from '../settings/can-deactive.guard';


const editorRoutes: Routes = [{
  path: 'editor', component: EditorComponent, canDeactivate: [CanDeactivateGuard]
}, {
  path: 'article/:slug', component: ArticleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(editorRoutes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
