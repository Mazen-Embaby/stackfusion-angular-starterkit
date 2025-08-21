import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  merge,
} from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../models/product.interface';
import { Utils } from '@sf/utils/utils';
import { Pagination } from '../models/Pagination.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RatingComponent } from '@sf/rating';
import { ShortNumberPipe } from '@sf/pipes';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [
    ShortNumberPipe,
    RatingComponent,
    RouterOutlet,
    RouterLink,
    NgClass,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatRippleModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './product-page.html',
  styleUrls: ['./product-page.scss'],
})
export class ProductPage implements OnInit, AfterViewInit {
  private _productService = inject(ProductService);

  @ViewChild('drawer')
  private _drawer!: MatDrawer;

  @ViewChild(MatPaginator)
  private _paginator!: MatPaginator;

  searchInputControl: UntypedFormControl = new UntypedFormControl();
  isLoading = false;

  stockThreshold = 50;

  products!: Product[];
  pagination: Pagination = {
    page: 0,
    pageSize: 10,
    total: 0,
  };

  ngOnInit(): void {
    this._productService.getProducts(
      this.pagination.page,
      this.pagination.pageSize,
    );

    this._productService.products$.subscribe((res) => {
      this.products = res;
    });

    this._productService.pagination$.subscribe((res) => {
      this.pagination = res;
    });

    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) => {
          this.isLoading = true;
          return this._productService.getProducts(
            this._paginator.pageIndex,
            this._paginator.pageSize,
            query,
          );
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
          this._productService.getProducts(
            this._paginator.pageIndex,
            this._paginator.pageSize,
          );
          return this.products;
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  addProduct() {
    const product: Product = {
      name: '',
      img: '',
      category: '',
      stock: 0,
      price: 0,
      salePerDay: 0,
      salePerMonth: 0,
      rating: 0,
      sales: 0,
      revenue: 0,
      lastUpdate: '',
    };

    this._productService.selectedProduct.next(product);

    this._drawer.toggle();
  }

  editProduct(product: Product) {
    this._productService.selectedProduct.next(product);

    this._drawer.toggle();
  }

  deleteProduct(product: Product) {
    this._productService.delete(product.id!);
  }

  export() {
    Utils.downloadFile(this.products, 'products.csv');
  }
}
