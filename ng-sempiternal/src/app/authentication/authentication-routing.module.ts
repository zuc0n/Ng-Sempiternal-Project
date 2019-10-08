import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';


const authRoutes: Routes = [{
  path: 'signup', component: SignUpComponent,
},
{
  path: 'signin', component: LogInComponent
}];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
