import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { LimitCharacterPipe } from './limit-character.pipe';


@NgModule({
  declarations: [HomeComponent, LimitCharacterPipe],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
