import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface ToggleTheme {
  name: string;
  theme: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSignal = signal<boolean>(true); // Default to dark mode

  protected readonly themes: ToggleTheme[] = [
    // { name: 'Auto', theme: 'auto' },
    { name: 'Dark', theme: 'dark' },
    { name: 'Light', theme: null },
  ];
  constructor() {
    // On app load, check if dark mode is stored in localStorage or the user's preferences
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.darkModeSignal.set(savedTheme === 'true');
    } else {
      this.darkModeSignal.set(true);
      // this.darkModeSignal.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    this.applyDarkMode(this.darkModeSignal());
    this.toggleTheme(this.darkModeSignal());
  }

  // Getter to access dark mode state
  get darkMode$() {
    return this.darkModeSignal; // Returns the Signal itself
  }

  // Method to toggle dark mode
  toggleDarkMode() {
    const newState = !this.darkModeSignal();
    this.darkModeSignal.set(newState);
    localStorage.setItem('darkMode', newState.toString());
    this.applyDarkMode(newState);
    this.toggleTheme(newState);
  }

  // Apply dark mode to the document
  private applyDarkMode(isDark: boolean) {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  protected readonly xxx = inject(DOCUMENT).documentElement;
  // protected readonly ngDocThemeService = inject(NgDocThemeService);

  get currentTheme(): ToggleTheme {
    const theme = this.xxx.getAttribute('data-theme');

    return this.themes.find(({ theme: t }) => t === theme) ?? this.themes[0];
  }

  get nextTheme(): ToggleTheme {
    const index = this.themes.findIndex(({ theme }) => theme === this.currentTheme.theme);

    return this.themes[(index + 1) % this.themes.length];
  }

  toggleTheme(isDark: boolean): void {
    const { theme } = this.nextTheme;
    // this.ngDocThemeService.set(theme ?? undefined);
  }
}
