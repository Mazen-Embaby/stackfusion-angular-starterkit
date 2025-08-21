import { ColorToTheme, FlowbiteColors } from '../../core/model/flowbite.colors';
import { createTheme } from '../../utils/create-theme';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface FlowbiteTooltipColors
  extends Pick<FlowbiteColors, 'default' | 'info' | 'failure' | 'success' | 'warning' | 'primary'> {
  [key: string]: ColorToTheme;
}

export interface FlowbiteTooltipTheme {
  host: FlowbiteTooltipHostTheme;
}

export interface FlowbiteTooltipHostTheme {
  base: string;
  transition: string;
  color: FlowbiteTooltipColors;
}

export const flowbiteTooltipTheme: FlowbiteTooltipTheme = createTheme({
  host: {
    base: 'absolute z-10 inline-block rounded-lg px-3 py-2 text-sm font-medium shadow-lg',
    transition: 'transition-opacity duration-150 ease-in-out',
    color: {
      default: {
        light: 'bg-gray-900 text-white',
        dark: 'dark:bg-gray-700 dark:text-white',
      },
      info: {
        light: 'bg-blue-600 text-white',
        dark: 'dark:bg-blue-500 dark:text-white',
      },
      failure: {
        light: 'bg-red-600 text-white',
        dark: 'dark:bg-red-500 dark:text-white',
      },
      success: {
        light: 'bg-green-600 text-white',
        dark: 'dark:bg-green-500 dark:text-white',
      },
      warning: {
        light: 'bg-yellow-600 text-white',
        dark: 'dark:bg-yellow-500 dark:text-white',
      },
      primary: {
        light: 'bg-blue-600 text-white',
        dark: 'dark:bg-blue-500 dark:text-white',
      },
    },
  },
});
