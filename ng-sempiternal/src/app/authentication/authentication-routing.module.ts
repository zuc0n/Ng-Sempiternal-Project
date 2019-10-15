import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard';


const authRoutes: Routes = [{
  path: 'signup', component: SignUpComponent,
},
{
  path: 'signin', component: LogInComponent, canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
