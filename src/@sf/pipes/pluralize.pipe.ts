/* 
Handles pluralization of words based on the count provided. It can change “item” to “items” when the count is greater than one.
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {
  transform(word: string, count: number): string {
    if (!word) return '';

    if (count === 1) {
      return word;
    } else {
      // Simple rule for adding "s" to make it plural
      return word + 's';
    }
  }
}

// <p>{{ 1 | pluralize:'item' }}</p>
// <!-- Output: "item" -->

// <p>{{ 5 | pluralize:'item' }}</p>
// <!-- Output: "items" -->
