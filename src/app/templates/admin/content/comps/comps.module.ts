import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompsPage } from './comps-page';

const routes: Routes = [
  {
    path: '',
    component: CompsPage,
  },

  // componenets
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CompsModule {}
