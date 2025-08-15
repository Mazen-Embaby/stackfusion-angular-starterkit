import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatePage } from './template-page';
import { TemplateDetail } from './template-detail/template-detail';
const routes: Routes = [
  {
    path: '',
    component: TemplatePage,
  },
  {
    path: 'detail/:title',
    component: TemplateDetail,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class TemplateModule {}
