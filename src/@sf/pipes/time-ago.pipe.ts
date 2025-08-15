// many pipe MIT https://github.com/danrevah/ngx-pipes?tab=readme-ov-file#timeago

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgoPipe',
})
export class TimeAgoPipe implements PipeTransform {
  private static YEAR_MS: number = 1000 * 60 * 60 * 24 * 7 * 4 * 12;
  private static MAPPER: any = [
    { single: 'last year', many: 'years', div: 1 },
    { single: 'last month', many: 'months', div: 12 },
    { single: 'last week', many: 'weeks', div: 4 },
    { single: 'yesterday', many: 'days', div: 7 },
    { single: 'an hour ago', many: 'hours', div: 24 },
    { single: 'just now', many: 'minutes', div: 60 },
  ];

  /**
   * @param inputDate: Date | Moment - not included as TypeScript interface,
   * in order to keep `ngx-pipes` "pure" from dependencies!
   */
  public transform(inputDate: any): string {
    if (!inputDate || (!inputDate.getTime && !inputDate.toDate)) {
      return 'Invalid date';
    }

    const past = inputDate.toDate ? inputDate.toDate() : inputDate.getTime();
    const now = +new Date();

    if (past > now) {
      return 'in the future';
    }

    for (let i = 0, l = TimeAgoPipe.MAPPER.length, ms = now - past, div = TimeAgoPipe.YEAR_MS; i < l; ++i) {
      const elm = TimeAgoPipe.MAPPER[i];
      const unit = Math.floor(ms / (div /= elm.div));

      if (unit >= 1) {
        return unit === 1 ? elm.single : `${unit} ${elm.many} ago`;
      }
    }

    return 'just now';
  }
}

// another solution
// https://blog.bitsrc.io/mastering-custom-pipes-in-angular-31-real-world-examples-2023-c7ce8ec7faae
// npm install date-fns

// import { Pipe, PipeTransform } from '@angular/core';
// import { formatDistanceToNow } from 'date-fns';

// @Pipe({ name: 'timeAgo' })
// export class TimeAgoPipe implements PipeTransform {
//   transform(timestamp: number | Date): string {
//     if (!timestamp) return '';
//     return formatDistanceToNow(timestamp) + ' ago';
//   }
// }

// <p>{{ someTimestamp | timeAgo }}</p>
// <!-- Example: "3 hours ago" or "yesterday" -->
