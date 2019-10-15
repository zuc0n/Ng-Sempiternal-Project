import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FavouritesComponent } from './profile/favourites/favourites.component';
import { ArticlelistComponent } from './profile/articlelist/articlelist.component';


const routes: Routes = [
  {
    path: 'profile/:username', component: ProfileComponent, children: [{
      path: 'favourites', component: FavouritesComponent
    }, {
      path: '', component: ArticlelistComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
