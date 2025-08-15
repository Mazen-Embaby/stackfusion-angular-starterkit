import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly route = inject(ActivatedRoute);

  public active_route = new BehaviorSubject<string>('');
  public active_fragment = new BehaviorSubject<string>('');

  constructor() {
    this.route.fragment.subscribe((frag) => {
      this.active_fragment.next(frag ?? '');
    });
    this.route.url.subscribe((url) => {
      this.active_route.next(url[0].path);
    });
  }
}
