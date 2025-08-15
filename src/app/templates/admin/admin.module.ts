import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard/b', pathMatch: 'full' },

  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./content/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },

  {
    path: 'app/ecommerce',
    loadChildren: () => import('./content/pages/ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
  },

  // componenets
  {
    path: 'comp',
    loadChildren: () => import('./content/comps/comps.module').then((m) => m.CompsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdminModule {}
