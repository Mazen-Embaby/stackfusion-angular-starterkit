import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/template', pathMatch: 'full' },

  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: 'template',
        loadChildren: () => import('./template/template.module').then((m) => m.TemplateModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), TranslateModule],
})
export class HomeModule {}
