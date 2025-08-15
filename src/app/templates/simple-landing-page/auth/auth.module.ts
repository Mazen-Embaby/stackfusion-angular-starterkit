import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordPage } from './reset-password/reset-password-page';
import { SigninPage } from './signin/signin-page';
import { SignupPage } from './signup/signup-page';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninPage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },
  {
    path: 'reset-password',
    component: ResetPasswordPage,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class AuthModule {}
