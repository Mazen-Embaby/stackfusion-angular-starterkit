import { Component, OnInit, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '@sf/utils/utils';
import { ProductService } from '../../product.service';
import { Product } from '../../models/product.interface';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-add-edit-product',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatPaginatorModule,
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  private _productService = inject(ProductService);
  private _formBuilder = inject(UntypedFormBuilder);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _matDrawer = inject(MatDrawer);

  product?: Product;
  selectedProductForm!: UntypedFormGroup;

  isAddMode!: boolean;

  ngOnInit(): void {
    this.selectedProductForm = this._formBuilder.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],

      category: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });

    // subscribe to selected product which is needed to updated
    this._productService.selectedProduct.subscribe((pro) => {
      this.product = { ...pro };

      this.selectedProductForm.patchValue(this.product);

      const id = this._activatedRoute.snapshot.params['id'];
      this.isAddMode = id ? false : true;
    });
  }

  uploadImage(file: FileList | null) {
    if (!file || file.length < 1) {
      return;
    }

    Utils.imgURL2Base64(file[0]).subscribe((res) => {
      this.product!.img = res;
    });
  }

  saveUpdate() {
    if (this.selectedProductForm.invalid) {
      return;
    }

    this.selectedProductForm.disable();
    const formValue = this.selectedProductForm.value;
    this._matDrawer.close();

    // create new product
    if (this.isAddMode) {
      this.product = {
        id: formValue.id,
        name: formValue.name,
        img: this.product!.img,
        category: formValue.category,
        stock: formValue.stock,
        price: formValue.price,
        salePerDay: 0,
        salePerMonth: 0,
        rating: 0,
        sales: 0,
        revenue: 0,
      };

      this._productService.save(this.product);
    }

    // update the exist product
    else {
      const proRef = this.product;

      const updatedProduct: Product = {
        ...proRef,
        ...formValue,
      };

      this._productService.update(updatedProduct);
    }

    this.selectedProductForm.enable();
  }

  deleteProduct(product: Product) {
    this._productService.delete(product.id!);
    this.closeDrawer();
  }

  closeDrawer() {
    this._matDrawer.close();
  }
}
