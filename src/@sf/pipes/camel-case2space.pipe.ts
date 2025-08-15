/* 
Converts camelCase or PascalCase strings into human-readable sentences with spaces.
*/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToSpaces',
})
export class CamelCaseToSpacesPipe implements PipeTransform {
  transform(camelCaseText: string): string {
    if (!camelCaseText) return '';
    return camelCaseText.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}

// <p>{{ 'camelCaseExample' | camelCaseToSpaces }}</p>
// <!-- Output: "camel Case Example" -->
