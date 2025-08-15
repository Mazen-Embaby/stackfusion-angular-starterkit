import { NgModule } from '@angular/core';
import { DashboardAComponent } from './dashboard-a/dashboard-a.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardBPage } from './dashboard-b/dashboard-b-page';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [DashboardAComponent, DashboardBPage, RouterModule.forChild(routes), MatIconModule, NgApexchartsModule],
})
export class DashboardModule {}
