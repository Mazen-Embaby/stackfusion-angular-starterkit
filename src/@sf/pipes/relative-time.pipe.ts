// /*
// Displays timestamps in a relative format, like “just now,” “a few minutes ago,” or “yesterday.”
// You can use a library like date-fns for this purpose.
// npm install date-fns
// */

// import { Pipe, PipeTransform } from '@angular/core';
// import { formatDistanceToNow } from 'date-fns';

// @Pipe({
//   name: 'relativeTime',
// })
// export class RelativeTimePipe implements PipeTransform {
//   transform(timestamp: number | Date): string {
//     if (!timestamp) return '';
//     return formatDistanceToNow(timestamp, { addSuffix: true });
//   }
// }

// // <p>{{ someTimestamp | relativeTime }}</p>
// // <!-- Example: "just now," "a few minutes ago," "yesterday," etc. -->
