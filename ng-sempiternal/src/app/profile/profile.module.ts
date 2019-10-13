import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile.service';
import { FavouritesComponent } from './profile/favourites/favourites.component';
import { ArticlelistComponent } from './profile/articlelist/articlelist.component';


@NgModule({
  declarations: [ProfileComponent, FavouritesComponent, ArticlelistComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
