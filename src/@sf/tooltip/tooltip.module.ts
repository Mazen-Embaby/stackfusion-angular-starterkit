import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipBtnDirective } from './tooltip-btn.directive';
import { TooltipViewDirective } from './tooltip-view.directive';
import { TooltipComponent } from './tooltip.component';

@NgModule({
  imports: [TooltipComponent, CommonModule, TooltipBtnDirective, TooltipViewDirective],
  exports: [TooltipComponent, TooltipBtnDirective, TooltipViewDirective],
})
export class TooltipModule {}
