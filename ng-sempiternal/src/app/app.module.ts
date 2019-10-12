import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from './home/home.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { SettingsComponent } from './settings/settings/settings.component';
import { EditorModule } from './editor/editor.module';
import { EditorComponent } from './editor/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    
    HomeModule,
    AuthenticationModule,
    FormsModule,
    AppRoutingModule,
    SettingsModule,
  ],
  providers: [],
})
export class AppModule { }
