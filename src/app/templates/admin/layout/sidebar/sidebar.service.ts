import { ElementRef, Injectable } from '@angular/core';
import { Drawer } from 'flowbite';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _targetElement$: Subject<ElementRef> = new ReplaySubject(1);
  drawer!: Drawer;

  get targetElement() {
    return this._targetElement$.asObservable();
  }

  setTargetElement(targetElement: ElementRef) {
    this._targetElement$.next(targetElement);
    this.drawer = new Drawer(targetElement.nativeElement);
  }
}
