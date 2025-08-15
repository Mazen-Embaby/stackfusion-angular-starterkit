import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInAPage } from './auth/sign-in/simple/sign-in-a-page';

const routes: Routes = [
  {
    path: 'sign-in/simple',
    component: SignInAPage,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class PagesModule {}
