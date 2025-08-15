import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPage } from './sign-in/sign-in-page';
import { SignOutPage } from './sign-out/sign-out-page';
import { SignUpPage } from './sign-up/sign-up-page';
import { ForgetPasswordPage } from './forget-password/forget-password-page';
import { ProviderPage } from './provider/provider/provider-page';
import { NotLoginGuard } from './guards/not.login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    canActivate: [NotLoginGuard],
    path: 'sign-in',
    component: SignInPage,
  },
  {
    canActivate: [NotLoginGuard],
    path: 'sign-up',
    component: SignUpPage,
  },
  {
    canActivate: [AuthGuard],
    path: 'sign-out',
    component: SignOutPage,
  },
  {
    canActivate: [NotLoginGuard],
    path: 'forget-password',
    component: ForgetPasswordPage,
  },

  {
    canActivate: [NotLoginGuard],
    path: 'connect/:providerName/redirect',
    component: ProviderPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ProviderPage, ForgetPasswordPage, SignInPage, SignOutPage, SignUpPage],
})
export class AuthModule {}
