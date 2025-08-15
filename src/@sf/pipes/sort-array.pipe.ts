/*
Sorts an array of objects based on a specified property in ascending or descending order.
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArray',
})
export class SortArrayPipe implements PipeTransform {
  transform(array: any[], property: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!array) return [];
    return array.sort((a, b) => {
      if (order === 'asc') {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return b[property] < a[property] ? -1 : 1;
      }
    });
  }
}

// <ul>
//   <li *ngFor="let item of items | sortArray:'price':'asc'">{{ item.name }} - {{ item.price }}</li>
// </ul>
