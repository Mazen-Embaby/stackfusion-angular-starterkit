import { colorToTheme } from '../../utils/color-to-theme';
import { DeepPartial } from '../../utils/flowbite.deep-partial';
import { mergeDeep } from '../../utils/merge-theme';
import { injectFlowbiteTooltipConfig } from '../config/tooltip-config';
import type { FlowbiteTooltipColors, FlowbiteTooltipTheme } from './theme';
import {
  flowbiteTooltipState,
  provideFlowbiteTooltipState,
} from './tooltip-state';

import {
  computed,
  Directive,
  input,
  OnInit,
  OnDestroy,
  ElementRef,
  NgZone,
  inject,
} from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { SfAccessibilityService } from '../../core/accessibility/accessibility.service';

/**
 * Tooltip directive that provides tooltip functionality following Angular Material patterns.
 *
 * This directive can be applied to any element to show a tooltip on hover, focus, or click.
 * It provides proper accessibility support and positioning.
 *
 * @example
 * ```html
 * <button sfTooltip="Help text" sfTooltipPosition="top">
 *   Hover me
 * </button>
 *
 * <button [sfTooltip]="tooltipText" [sfTooltipDisabled]="false">
 *   Dynamic tooltip
 * </button>
 * ```
 */
@Directive({
  selector: `[sfTooltip]`,
  exportAs: 'sfTooltip',
  hostDirectives: [],
  providers: [provideFlowbiteTooltipState()],
  host: {
    '[attr.aria-describedby]': 'tooltipId',
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
    '(keydown)': 'onKeydown($event)',
  },
  standalone: true,
})
export class Tooltip implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly accessibility = inject(SfAccessibilityService);
  protected readonly config = injectFlowbiteTooltipConfig();

  /** Unique ID for the tooltip element */
  tooltipId = this.accessibility.generateId('tooltip');

  /** The tooltip text to display */
  readonly sfTooltip = input<string>('');

  /** The position of the tooltip relative to the element */
  readonly sfTooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>(
    'top',
  );

  /** Whether the tooltip is disabled */
  readonly sfTooltipDisabled = input(false);

  /** The delay before showing the tooltip (in milliseconds) */
  readonly sfTooltipShowDelay = input(0);

  /** The delay before hiding the tooltip (in milliseconds) */
  readonly sfTooltipHideDelay = input(0);

  /** Whether the tooltip should be shown on touch devices */
  readonly sfTooltipTouchGestures = input<'auto' | 'on' | 'off'>('auto');

  /** Custom CSS class for the tooltip */
  readonly sfTooltipClass = input<string>('');

  /**
   * @see {@link injectFlowbiteTooltipConfig}
   */
  readonly color = input<keyof FlowbiteTooltipColors>(this.config.color);

  /**
   * @see {@link injectFlowbiteTooltipConfig}
   */
  readonly customTheme = input<DeepPartial<FlowbiteTooltipTheme>>(
    this.config.customTheme,
  );

  /** Whether the tooltip is currently visible */
  private _visible = false;

  /** The tooltip element */
  private _tooltipElement: HTMLElement | null = null;

  /** Timeout for showing/hiding the tooltip */
  private _showTimeout: number | null = null;
  private _hideTimeout: number | null = null;

  /** Scroll event listener for repositioning */
  private _scrollListener: (() => void) | null = null;

  /** Resize event listener for repositioning */
  private _resizeListener: (() => void) | null = null;

  readonly theme = computed(() => {
    const mergedTheme = mergeDeep(
      this.config.baseTheme,
      this.state.customTheme(),
    );

    return {
      tooltip: {
        root: twMerge(
          mergedTheme.host.base,
          mergedTheme.host.transition,
          colorToTheme(mergedTheme.host.color, this.state.color()),
        ),
      },
    };
  });

  /**
   * @internal
   */
  readonly state = flowbiteTooltipState<Tooltip>(this);

  ngOnInit(): void {
    this.createTooltipElement();
  }

  ngOnDestroy(): void {
    this.hide();
    this.destroyTooltipElement();

    // Clean up scroll listener
    if (this._scrollListener) {
      window.removeEventListener('scroll', this._scrollListener);
      this._scrollListener = null;
    }

    // Clean up resize listener
    if (this._resizeListener) {
      window.removeEventListener('resize', this._resizeListener);
      this._resizeListener = null;
    }
  }

  /**
   * Shows the tooltip after the configured delay.
   */
  show(): void {
    if (this.sfTooltipDisabled() || !this.sfTooltip() || this._visible) {
      return;
    }

    // Clear any existing hide timeout
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }

    // Set show timeout
    this._showTimeout = setTimeout(() => {
      this._showTooltip();
    }, this.sfTooltipShowDelay());
  }

  /**
   * Hides the tooltip after the configured delay.
   */
  hide(): void {
    if (!this._visible) {
      return;
    }

    // Clear any existing show timeout
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    // Set hide timeout
    this._hideTimeout = setTimeout(() => {
      this._hideTooltip();
    }, this.sfTooltipHideDelay());
  }

  /**
   * Handles keyboard events for accessibility.
   */
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this._visible) {
      this.hide();
    }
  }

  /**
   * Creates the tooltip element and adds it to the DOM.
   */
  private createTooltipElement(): void {
    if (this._tooltipElement) {
      return;
    }

    this._tooltipElement = document.createElement('div');
    this._tooltipElement.id = this.tooltipId;
    this._tooltipElement.setAttribute('role', 'tooltip');
    this._tooltipElement.setAttribute('aria-hidden', 'true');
    this._tooltipElement.style.position = 'absolute';
    this._tooltipElement.style.pointerEvents = 'none';
    this._tooltipElement.style.zIndex = '1000';
    this._tooltipElement.style.opacity = '0';
    this._tooltipElement.style.transition = 'opacity 0.15s ease-in-out';

    // Apply theme classes only to the tooltip element
    const themeClasses = this.theme().tooltip.root;
    this._tooltipElement.className = `sf-tooltip ${themeClasses} ${this.sfTooltipClass()}`;

    document.body.appendChild(this._tooltipElement);
  }

  /**
   * Shows the tooltip element.
   */
  private _showTooltip(): void {
    if (!this._tooltipElement || !this.sfTooltip()) {
      return;
    }

    this._tooltipElement.textContent = this.sfTooltip();
    this._tooltipElement.setAttribute('aria-hidden', 'false');
    this._tooltipElement.style.opacity = '1';

    this.positionTooltip();
    this._visible = true;

    // Add scroll listener to reposition tooltip on scroll
    this._scrollListener = () => {
      if (this._visible && this._tooltipElement) {
        this.positionTooltip();
      }
    };
    window.addEventListener('scroll', this._scrollListener, { passive: true });

    // Add resize listener to reposition tooltip on window resize
    this._resizeListener = () => {
      if (this._visible && this._tooltipElement) {
        this.positionTooltip();
      }
    };
    window.addEventListener('resize', this._resizeListener, { passive: true });

    // Announce to screen readers
    this.accessibility.announceToScreenReader(this.sfTooltip(), 'polite');
  }

  /**
   * Hides the tooltip element.
   */
  private _hideTooltip(): void {
    if (!this._tooltipElement) {
      return;
    }

    this._tooltipElement.style.opacity = '0';
    this._tooltipElement.setAttribute('aria-hidden', 'true');
    this._visible = false;

    // Remove scroll listener
    if (this._scrollListener) {
      window.removeEventListener('scroll', this._scrollListener);
      this._scrollListener = null;
    }

    // Remove resize listener
    if (this._resizeListener) {
      window.removeEventListener('resize', this._resizeListener);
      this._resizeListener = null;
    }
  }

  /**
   * Positions the tooltip relative to the host element.
   */
  private positionTooltip(): void {
    if (!this._tooltipElement) {
      return;
    }

    const hostElement = this.elementRef.nativeElement;
    const hostRect = hostElement.getBoundingClientRect();
    const tooltipRect = this._tooltipElement.getBoundingClientRect();

    // Get scroll position
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let top: number;
    let left: number;

    switch (this.sfTooltipPosition()) {
      case 'top':
        top = hostRect.top + scrollY - tooltipRect.height - 8;
        left =
          hostRect.left + scrollX + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + scrollY + 8;
        left =
          hostRect.left + scrollX + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top =
          hostRect.top + scrollY + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top =
          hostRect.top + scrollY + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + scrollX + 8;
        break;
      default:
        top = hostRect.top + scrollY - tooltipRect.height - 8;
        left =
          hostRect.left + scrollX + (hostRect.width - tooltipRect.width) / 2;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < scrollX + 8) {
      left = scrollX + 8;
    } else if (left + tooltipRect.width > scrollX + viewportWidth - 8) {
      left = scrollX + viewportWidth - tooltipRect.width - 8;
    }

    if (top < scrollY + 8) {
      top = scrollY + 8;
    } else if (top + tooltipRect.height > scrollY + viewportHeight - 8) {
      top = scrollY + viewportHeight - tooltipRect.height - 8;
    }

    this._tooltipElement.style.top = `${top}px`;
    this._tooltipElement.style.left = `${left}px`;
  }

  /**
   * Destroys the tooltip element and removes it from the DOM.
   */
  private destroyTooltipElement(): void {
    if (this._tooltipElement) {
      document.body.removeChild(this._tooltipElement);
      this._tooltipElement = null;
    }
  }
}
