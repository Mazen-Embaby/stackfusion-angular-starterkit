import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import {
  Language,
  LanguageSelectorComponent,
} from '@sf/language-selector/language-selector.component';

@Component({
  selector: 'app-language',
  imports: [MatMenuModule, LanguageSelectorComponent],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit, OnDestroy {
  private readonly _translate = inject(TranslateService);

  private _unsubscribeAll = new Subject<void>();

  availableLanguages: Language[] = [
    { code: 'en', name: 'English', flag: 'flags/us.svg' },
    { code: 'de', name: 'German', flag: 'flags/de.svg' },
  ];
  currentLanguage = this.availableLanguages[0];

  ngOnInit(): void {
    // this.lang = this._translate.currentLang;
    this._translate.onLangChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((event) => {
        // this.lang = event.lang;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onLanguageChanged(newLang: Language): void {
    this._translate.use(newLang.code);
    this.currentLanguage = newLang;
    // Implement logic for switching language in your app (e.g., translation service)
  }
}
