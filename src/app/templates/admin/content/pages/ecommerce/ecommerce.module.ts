import { NgModule } from '@angular/core';
import { EcommercePage } from './ecommerce-page';
import { RouterModule, Routes } from '@angular/router';
import { ProductPage } from './product/product-page';
import { CustomerPage } from './customer/customer-page';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';

const routes: Routes = [
  {
    path: '',
    component: EcommercePage,
    children: [
      {
        path: '',
        component: ProductPage,
        children: [
          {
            path: 'add',
            component: AddEditProductComponent,
            data: { isAddMode: true },
          },
          {
            path: 'edit/:id',
            component: AddEditProductComponent,
            data: { isAddMode: false },
          },
        ],
      },
      {
        path: 'customers',
        component: CustomerPage,
        children: [
          {
            path: 'add',
            component: AddEditCustomerComponent,
            data: { isAddMode: true },
          },
          {
            path: 'edit/:id',
            component: AddEditCustomerComponent,
            data: { isAddMode: false },
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    EcommercePage,
    ProductPage,
    CustomerPage,
    AddEditProductComponent,
    AddEditCustomerComponent,

    RouterModule.forChild(routes),
  ],
})
export class EcommerceModule {}
