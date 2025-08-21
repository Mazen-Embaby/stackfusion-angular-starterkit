import { NgModule } from '@angular/core';
import { DashboardAComponent } from './dashboard-a/dashboard-a.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardBPage } from './dashboard-b/dashboard-b-page';

const routes: Routes = [
  { path: '', redirectTo: './a', pathMatch: 'full' },

  {
    path: 'a',
    component: DashboardAComponent,
  },
  {
    path: 'b',
    component: DashboardBPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardModule {}
