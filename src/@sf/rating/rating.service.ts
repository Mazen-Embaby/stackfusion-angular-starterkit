import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  max = 5;
  readonly = false;
  resettable = false;
  tabindex: number | string = 0;
}
