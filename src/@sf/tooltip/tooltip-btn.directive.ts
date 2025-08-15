import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[sfTooltipBtn]',
})
export class TooltipBtnDirective {
  private el = inject(ElementRef);

  element(): any {
    if (!this.el) {
      throw new Error('Element not initialized!.');
    }
    return this.el;
  }
}
