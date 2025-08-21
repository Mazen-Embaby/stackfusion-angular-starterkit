import { NgModule } from '@angular/core';
import { Tooltip } from './tooltip/tooltip.directive';

/**
 * @deprecated Use standalone components instead. This module will be removed in a future version.
 * Import the directive directly: `import { Tooltip } from '@sf/tooltip';`
 */
@NgModule({
  imports: [Tooltip],
  exports: [Tooltip],
})
export class TooltipModule {}
