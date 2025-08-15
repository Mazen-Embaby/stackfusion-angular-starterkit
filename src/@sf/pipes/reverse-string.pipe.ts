import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseString',
})
export class ReverseStringPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.split('').reverse().join('');
  }
}

// <p>{{ 'Angular' | reverseString }}</p>
// <!-- Output: "ralugnA" -->
