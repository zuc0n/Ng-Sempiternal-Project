import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile.service';
import { ArticlelistComponent } from './profile/articlelist/articlelist.component';
import { FavoriteDirective } from './favorite.directive';


@NgModule({
  declarations: [ProfileComponent, ArticlelistComponent, FavoriteDirective],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
