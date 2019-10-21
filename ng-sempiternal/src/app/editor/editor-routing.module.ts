import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { ArticleComponent } from './article/article.component';
import { CanDeactivateGuard } from '../settings/can-deactive.guard';
import { IsLoginGuard } from '../authentication/is-login.guard';


const editorRoutes: Routes = [{
  path: 'editor', component: EditorComponent, canDeactivate: [CanDeactivateGuard], canActivate: [IsLoginGuard]
}, {
  path: 'editor/:slug', component: EditorComponent
}, {
  path: 'article/:slug', component: ArticleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(editorRoutes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
