import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../../../theme.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toggle-dark-mode',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './toggle-dark-mode.component.html',
  styleUrl: './toggle-dark-mode.component.scss',
})
export class ToggleDarkModeComponent {
  private themeService = inject(ThemeService);

  darkMode$ = computed(() => this.themeService.darkMode$()) ?? true;

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
