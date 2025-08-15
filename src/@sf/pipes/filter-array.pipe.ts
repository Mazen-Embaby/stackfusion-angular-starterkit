/*
 refrence 
// https://blog.bitsrc.io/mastering-custom-pipes-in-angular-31-real-world-examples-2023-c7ce8ec7faae
Filters an array of objects based on a given property and filter value.
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {
  transform(items: any[], property: string, filterValue: any): any[] {
    if (!items) return [];
    return items.filter((item) => item[property] === filterValue);
  }
}

// <ul>
//   <li *ngFor="let item of items | filterArray:'category':'Electronics'">{{ item.name }}</li>
// </ul>
