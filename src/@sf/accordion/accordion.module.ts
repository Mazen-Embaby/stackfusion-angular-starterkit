import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionContentComponent } from './accordion-content.component';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionTitleComponent } from './accordion-title.component';

@NgModule({
  imports: [
    CommonModule,
    AccordionComponent,
    AccordionContentComponent,
    AccordionPanelComponent,
    AccordionTitleComponent,
  ],
  exports: [AccordionComponent, AccordionContentComponent, AccordionPanelComponent, AccordionTitleComponent],
})
export class AccordionModule {}
