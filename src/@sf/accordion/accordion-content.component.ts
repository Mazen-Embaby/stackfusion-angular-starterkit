import { Component, inject } from '@angular/core';
import { AccordionPanelComponent } from './accordion-panel.component';

@Component({
  selector: 'sf-accordion-content',
  template: ` @if (accordionPanel.open) {
    <div class="px-5 py-5 dark:bg-gray-900">
      <ng-content></ng-content>
    </div>
  }`,
})
export class AccordionContentComponent {
  readonly accordionPanel = inject(AccordionPanelComponent);
}
