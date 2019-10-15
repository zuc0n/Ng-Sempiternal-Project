import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';


const articleRoutes: Routes = [{
  path: 'article', component: ArticleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(articleRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
