import { Injectable, inject } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

/**
 * Service for managing accessibility features across components.
 *
 * This service provides utilities for handling keyboard navigation,
 * focus management, and ARIA attributes following WCAG guidelines.
 */
@Injectable({
  providedIn: 'root',
})
export class SfAccessibilityService {
  private readonly platform = inject(Platform);

  /**
   * Whether the user has requested reduced motion.
   */
  get prefersReducedMotion(): boolean {
    if (!this.platform.isBrowser) {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Whether the user has requested high contrast mode.
   */
  get prefersHighContrast(): boolean {
    if (!this.platform.isBrowser) {
      return false;
    }
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  /**
   * Whether the user has requested dark color scheme.
   */
  get prefersDarkColorScheme(): boolean {
    if (!this.platform.isBrowser) {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Generates a unique ID for ARIA attributes.
   */
  generateId(prefix: string = 'sf'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Sets focus to an element with proper error handling.
   */
  focusElement(element: HTMLElement | null): boolean {
    if (!element || !this.platform.isBrowser) {
      return false;
    }

    try {
      element.focus();
      return document.activeElement === element;
    } catch (error) {
      console.warn('Failed to focus element:', error);
      return false;
    }
  }

  /**
   * Manages focus within a container using roving tabindex.
   */
  manageRovingTabIndex(
    container: HTMLElement,
    focusableSelector: string = '[tabindex]',
    activeIndex: number = 0,
  ): void {
    const focusableElements = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));

    if (focusableElements.length === 0) {
      return;
    }

    // Set all elements to tabindex="-1" except the active one
    focusableElements.forEach((element, index) => {
      element.tabIndex = index === activeIndex ? 0 : -1;
    });

    // Focus the active element
    this.focusElement(focusableElements[activeIndex]);
  }

  /**
   * Handles keyboard navigation for a list of focusable elements.
   */
  handleKeyboardNavigation(event: KeyboardEvent, focusableElements: HTMLElement[], currentIndex: number): number {
    const key = event.key;
    let newIndex = currentIndex;

    switch (key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % focusableElements.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = focusableElements.length - 1;
        break;
      default:
        return currentIndex;
    }

    this.focusElement(focusableElements[newIndex]);
    return newIndex;
  }

  /**
   * Sets ARIA attributes on an element.
   */
  setAriaAttributes(element: HTMLElement, attributes: Record<string, string | boolean | null>): void {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value === null) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, String(value));
      }
    });
  }

  /**
   * Announces a message to screen readers.
   */
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.platform.isBrowser) {
      return;
    }

    // Create or get existing live region
    let liveRegion = document.getElementById('sf-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'sf-live-region';
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }

    // Set the message
    liveRegion.textContent = message;

    // Clear the message after a short delay
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = '';
      }
    }, 1000);
  }

  /**
   * Checks if an element is visible to screen readers.
   */
  isVisibleToScreenReader(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    const isHidden =
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      element.hidden ||
      element.getAttribute('aria-hidden') === 'true';

    return !isHidden;
  }

  /**
   * Gets the accessible name of an element.
   */
  getAccessibleName(element: HTMLElement): string {
    // Check for aria-label first
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) {
      return ariaLabel;
    }

    // Check for aria-labelledby
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    if (ariaLabelledBy) {
      const labelledElement = document.getElementById(ariaLabelledBy);
      if (labelledElement) {
        return labelledElement.textContent || '';
      }
    }

    // Check for title attribute
    const title = element.getAttribute('title');
    if (title) {
      return title;
    }

    // Fall back to text content
    return element.textContent || '';
  }
}
