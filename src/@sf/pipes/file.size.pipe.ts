/*
Converts a file size in bytes to a more human-readable format, such as KB, MB, or GB.
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number): string {
    if (isNaN(bytes) || bytes === 0) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
}

// <p>{{ 1024 | fileSize }}</p>
// <!-- Output: "1 KB" -->
