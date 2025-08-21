import { Component, OnInit, inject } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from '@sf/utils/utils';
import { Customer } from '../../models/customer.interface';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-add-edit-customer',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss'],
})
export class AddEditCustomerComponent implements OnInit {
  private _customerService = inject(CustomerService);
  private _formBuilder = inject(UntypedFormBuilder);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _matDrawer = inject(MatDrawer);

  customer?: Customer;
  selectedCustomerForm!: UntypedFormGroup;

  isAddMode!: boolean;

  ngOnInit(): void {
    this.selectedCustomerForm = this._formBuilder.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      county: [null, [Validators.required]],
      userRole: ['Viewer', [Validators.required]],
    });

    // subscribe to selected customer which is needed to updated
    this._customerService.selectedCustomer.subscribe((cust) => {
      // clone object
      this.customer = { ...cust };

      this.selectedCustomerForm.patchValue(this.customer);

      const id = this._activatedRoute.snapshot.params['id'];
      this.isAddMode = id ? false : true;
    });
  }

  uploadImage(file: FileList | null) {
    if (!file || file.length < 1) {
      return;
    }

    Utils.imgURL2Base64(file[0]).subscribe((res) => {
      this.customer!.img = res;
    });
  }

  saveUpdate() {
    if (this.selectedCustomerForm.invalid) {
      return;
    }

    this.selectedCustomerForm.disable();
    const formValue = this.selectedCustomerForm.value;
    this._matDrawer.close();

    // create new customer
    if (this.isAddMode) {
      this.customer = {
        id: formValue.id,
        name: formValue.name,
        img: this.customer!.img,
        email: formValue.email,
        phone: formValue.phone,
        county: formValue.county,
        userRole: formValue.userRole,
        status: 'Inactive',
      };

      this._customerService.save(this.customer);
    }

    // update the exist customer
    else {
      const custRef = this.customer;

      const updatedCustomer: Customer = {
        ...custRef,
        ...formValue,
      };
      this._customerService.update(updatedCustomer);
    }

    this.selectedCustomerForm.enable();
  }

  deleteCustomer(customer: Customer) {
    this._customerService.delete(customer.id!);
    this.closeDrawer();
  }

  closeDrawer() {
    this._matDrawer.close();
  }
}
