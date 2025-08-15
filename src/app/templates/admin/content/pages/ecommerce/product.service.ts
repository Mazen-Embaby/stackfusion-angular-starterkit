import { Injectable, inject } from '@angular/core';
import { ToastService } from 'ngx-toastr-notifier';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { products } from './data/products';
import { Pagination } from './models/Pagination.interface';
import { Product } from './models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _toastr = inject(ToastService);

  // all products in the database
  products: Product[] = products;

  selectedProduct = new ReplaySubject<Product>(1);

  products$ = new ReplaySubject<Product[]>(1);
  pagination$ = new BehaviorSubject<Pagination>({
    pageSize: 10,
    page: 0,
    total: 0,
  });

  paginate(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;

    const spliceProducts = this.products.slice(start, end);

    return spliceProducts;
  }

  getProducts(pageIndex: number, pageSize: number, query?: string) {
    let filtered = this.products;

    if (query) {
      filtered = this.products.filter((res) => res.name.toLowerCase().includes(query.toLowerCase()));
    }

    const start = pageIndex * pageSize;
    const end = start + pageSize;

    const spliceProducts = filtered.slice(start, end);
    this.pagination$.next({
      page: pageIndex,
      pageSize: pageSize,
      total: products.length,
    });
    this.products$.next(spliceProducts);

    return this.products$;
  }

  save(product: Product) {
    if (!product.id) {
      this._toastr.error(`product ID should be provided.`, `${'Error occured'}`, {
        duration: 2000,
      });

      throw Error('product ID is not provided');
    }

    if (this.products.find((p) => p.id === product.id)) {
      this._toastr.error(`product ID ${product.id} should be unique.`, `${'Error occured'}`, {
        duration: 2000,
      });

      throw Error(
        'Product ID is already exist. kindly, either update the exist product, or choose a differnet product ID. As product ID should be unique.',
      );
    }

    this.products.unshift(product);

    this.getProducts(this.pagination$.value.page, this.pagination$.value.pageSize);

    this._toastr.success(`product ID ${product.id} has created`, `${'Created successfully'}`, {
      duration: 2000,
    });
  }

  update(product: Product) {
    const proIndex = this.products.findIndex((pro) => pro.id === product.id);

    // update product
    this.products[proIndex] = product;

    this.getProducts(this.pagination$.value.page, this.pagination$.value.pageSize);

    this._toastr.success(`product ID ${product.id} has updated`, `${'Updated successfully'}`, {
      duration: 2000,
    });
  }

  delete(id: string) {
    const proIndex = this.products.findIndex((pro) => pro.id === id);

    this.products.splice(proIndex, 1);
    this.getProducts(this.pagination$.value.page, this.pagination$.value.pageSize);

    this._toastr.success(`product ID: ${id} has deleted`, `${'Deleted successfully'}`, {
      duration: 2000,
    });
  }
}
