import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';
import type { Placement } from '@popperjs/core';
import { Tooltip } from 'flowbite';
import { TooltipOptions } from 'flowbite';

import { TooltipBtnDirective } from './tooltip-btn.directive';
import { TooltipViewDirective } from './tooltip-view.directive';

export declare type TooltipTriggerType = 'click' | 'hover' | 'none';

@Component({
  selector: 'sf-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements AfterViewInit {
  @Input()
  placement: Placement = 'bottom';

  @Input()
  triggerType: TooltipTriggerType = 'hover';

  @ContentChild(TooltipBtnDirective)
  ToolTipBtn!: TooltipBtnDirective;

  @ContentChild(TooltipViewDirective)
  toolTipView!: TooltipViewDirective;

  tooltip!: Tooltip;

  ngAfterViewInit(): void {
    const btnNative = this.ToolTipBtn.element().nativeElement;
    const viewNative = this.toolTipView.element().nativeElement;

    const tooltipOptions: TooltipOptions = {
      placement: this.placement,
      triggerType: this.triggerType,
    };

    this.tooltip = new Tooltip(viewNative, btnNative, tooltipOptions);
  }
}
