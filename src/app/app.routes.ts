import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminLayoutComponent } from './templates/admin/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },

  {
    path: 'template/live',
    children: [
      {
        canActivate: [AuthGuard],
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./templates/admin/admin.module').then((m) => m.AdminModule),
          },
        ],
      },
      {
        path: 'simple-landing-page',
        loadChildren: () =>
          import('./templates/simple-landing-page/simple-landing-page.module').then((m) => m.SimpleLandingPageModule),
      },
    ],
  },
  // {path: 'not-found', component: PageNotFoundComponent},
  // Wild Card Route for 404 request - make sure this is always the last element of the routes Array
  // { path: '**', pathMatch: 'full', redirectTo: '/home' },
];
