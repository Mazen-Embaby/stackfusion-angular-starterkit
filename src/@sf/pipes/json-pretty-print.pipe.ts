/*
Takes a JSON object and pretty-prints it, making it more readable for debugging purposes.
To accomplish this, you can use the JSON.stringify method with the spacing argument.
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonPrettyPrint',
})
export class JSONPrettyPrintPipe implements PipeTransform {
  transform(jsonObject: any): string {
    if (!jsonObject) return '';
    return JSON.stringify(jsonObject, null, 2); // 2 spaces for indentation
  }
}

// <pre>{{ someJsonObject | jsonPrettyPrint }}</pre>
// <!-- Outputs the JSON object in a nicely formatted way for debugging -->
