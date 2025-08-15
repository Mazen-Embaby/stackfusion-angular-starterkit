import { Injectable, inject } from '@angular/core';
import { ToastService } from 'ngx-toastr-notifier';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Customer } from './models/customer.interface';
import { customers } from './data/customer';
import { Pagination } from './models/Pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private _toastr = inject(ToastService);

  // all customers in the database
  customers: Customer[] = customers;

  selectedCustomer = new ReplaySubject<Customer>(1);

  customers$ = new ReplaySubject<Customer[]>(1);
  pagination$ = new BehaviorSubject<Pagination>({
    pageSize: 10,
    page: 0,
    total: 0,
  });

  paginate(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;

    const spliceCustomers = this.customers.slice(start, end);

    return spliceCustomers;
  }

  getCustomers(pageIndex: number, pageSize: number, query?: string) {
    let filtered = this.customers;

    if (query) {
      filtered = this.customers.filter((res) => res.name.toLowerCase().includes(query.toLowerCase()));
    }

    const start = pageIndex * pageSize;
    const end = start + pageSize;

    const spliceCustomers = filtered.slice(start, end);
    this.pagination$.next({
      page: pageIndex,
      pageSize: pageSize,
      total: customers.length,
    });
    this.customers$.next(spliceCustomers);

    return this.customers$;
  }

  save(customer: Customer) {
    if (!customer.id) {
      this._toastr.error(`customer ID should be provided.`, `${'Error occured'}`, {
        duration: 2000,
      });

      throw Error('customer ID is not provided');
    }

    if (this.customers.find((p) => p.id === customer.id)) {
      this._toastr.error(`customer ID ${customer.id} should be unique.`, `${'Error occured'}`, {
        duration: 2000,
      });

      throw Error(
        'Customer ID is already exist. kindly, either update the exist customer, or choose a differnet customer ID. As customer ID should be unique.',
      );
    }

    this.customers.unshift(customer);

    this.getCustomers(this.pagination$.value.page, this.pagination$.value.pageSize);

    this._toastr.success(`customer ID ${customer.id} has created`, `${'Created successfully'}`, {
      duration: 2000,
    });
  }

  update(customer: Customer) {
    const proIndex = this.customers.findIndex((pro) => pro.id === customer.id);

    // update customer
    this.customers[proIndex] = customer;

    this.getCustomers(this.pagination$.value.page, this.pagination$.value.pageSize);

    this._toastr.success(`customer ID ${customer.id} has updated`, `${'Updated successfully'}`, {
      duration: 2000,
    });
  }

  delete(id: string | number) {
    const proIndex = this.customers.findIndex((pro) => pro.id === id);

    this.customers.splice(proIndex, 1);
    this.getCustomers(this.pagination$.value.page, this.pagination$.value.pageSize);

    this._toastr.success(`customer ID: ${id} has deleted`, `${'Deleted successfully'}`, {
      duration: 2000,
    });
  }
}
