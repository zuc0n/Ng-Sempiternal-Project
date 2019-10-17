import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { LimitCharacterPipe } from './limit-character.pipe';
import { ApiService } from './api.service';


@NgModule({
  declarations: [HomeComponent, LimitCharacterPipe],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [ApiService]
})
export class HomeModule { }
