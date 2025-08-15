import { AfterViewInit, Component, ViewChild, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { debounceTime, distinctUntilChanged, switchMap, map, merge } from 'rxjs';
import { Utils } from '../../../../../../../@sf/utils/utils';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.interface';
import { Pagination } from '../models/Pagination.interface';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer',
  imports: [
    NgClass,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    MatPaginatorModule,
    DatePipe,
    RouterOutlet,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
  ],
  templateUrl: './customer-page.html',
  styleUrls: ['./customer-page.scss'],
})
export class CustomerPage implements AfterViewInit, OnInit {
  private _customerService = inject(CustomerService);

  @ViewChild('drawer')
  private drawer!: MatDrawer;

  @ViewChild(MatPaginator)
  private _paginator!: MatPaginator;

  searchInputControl: UntypedFormControl = new UntypedFormControl();
  isLoading = false;

  customers!: Customer[];
  pagination: Pagination = {
    page: 0,
    pageSize: 10,
    total: 0,
  };

  ngOnInit(): void {
    this._customerService.getCustomers(this.pagination.page, this.pagination.pageSize);

    this._customerService.customers$.subscribe((res) => {
      this.customers = res;
    });

    this._customerService.pagination$.subscribe((res) => {
      this.pagination = res;
    });

    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) => {
          this.isLoading = true;
          return this._customerService.getCustomers(this._paginator.pageIndex, this._paginator.pageSize, query);
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    merge(this._paginator.page)
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          this._customerService.getCustomers(this._paginator.pageIndex, this._paginator.pageSize);
          return this.customers;
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  addCustomer() {
    const customer: Customer = {
      id: '',
      name: '',
      img: '',
      email: '',
      phone: '',
      county: '',
      userRole: 'Viewer',
      status: 'Active',
    };

    this._customerService.selectedCustomer.next(customer);

    this.drawer.toggle();
  }

  editCustomer(customer: Customer) {
    this._customerService.selectedCustomer.next(customer);

    this.drawer.toggle();
  }

  deleteCustomer(customer: Customer) {
    this._customerService.delete(customer.id!);
  }

  export() {
    Utils.downloadFile(this.customers, 'customers.csv');
  }
}
