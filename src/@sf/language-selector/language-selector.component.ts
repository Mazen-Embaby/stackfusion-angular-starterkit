import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Language from './language.interface';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'sf-language-selector',
  imports: [FormsModule, MatMenuModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  @Input() availableLanguages: Language[] = [
    // {name:'English', code:'en', flag: 'flags/us.svg'}
  ]; // List of available languages
  @Input() currentLanguage: Language = {
    name: 'English',
    code: 'en',
    flag: 'flags/us.svg',
  }; // Current selected language code
  @Output() languageChanged = new EventEmitter<Language>(); // Event emitter to notify language change

  // Method to change the language
  onLanguageChange(languageCode: Language): void {
    this.languageChanged.emit(languageCode);
  }
}
export type { Language };
