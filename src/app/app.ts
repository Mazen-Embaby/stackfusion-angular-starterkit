import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import triangularAngularPackageJson from '../../package.json';
import { Title, Meta } from '@angular/platform-browser';
import { APP_INFO } from './app-info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('stackfusion');
  readonly appInfo = APP_INFO;

  private translate = inject(TranslateService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle(this.appInfo.SEO.title);
    this.metaService.addTags(this.appInfo.SEO.meta);
  }
  constructor() {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    // this.translate.use(this.translate.getBrowserLang() || 'de');
  }

  public readonly triangularAngularVersion = computed(
    () => triangularAngularPackageJson.version,
  );
}
