import { flowbiteDropdownContentTheme, type FlowbiteDropdownContentTheme } from '../dropdown-content/theme';

import type { Provider } from '@angular/core';
import { inject, InjectionToken } from '@angular/core';
import { DeepPartial } from '../../utils/flowbite.deep-partial';

export interface FlowbiteDropdownContentConfig {
  /**
   * The default theme of DropdownContent
   */
  baseTheme: FlowbiteDropdownContentTheme;

  /**
   * The custom theme of DropdownContent
   */
  customTheme: DeepPartial<FlowbiteDropdownContentTheme>;
}

export const defaultFlowbiteDropdownContentConfig: FlowbiteDropdownContentConfig = {
  baseTheme: flowbiteDropdownContentTheme,
  customTheme: {},
};

export const FlowbiteDropdownContentConfigToken = new InjectionToken<FlowbiteDropdownContentConfig>(
  'FlowbiteDropdownContentConfigToken',
);

/**
 * Provide the default DropdownContent configuration
 * @param config The DropdownContent configuration
 * @returns The provider
 */
export const provideFlowbiteDropdownContentConfig = (config: Partial<FlowbiteDropdownContentConfig>): Provider[] => [
  {
    provide: FlowbiteDropdownContentConfigToken,
    useValue: { ...defaultFlowbiteDropdownContentConfig, ...config },
  },
];

/**
 * Inject the DropdownContent configuration
 * @see {@link defaultFlowbiteDropdownContentConfig}
 * @returns The configuration
 */
export const injectFlowbiteDropdownContentConfig = (): FlowbiteDropdownContentConfig =>
  inject(FlowbiteDropdownContentConfigToken, { optional: true }) ?? defaultFlowbiteDropdownContentConfig;
