import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationRoute } from './navigation.model';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleDarkModeComponent } from '../toggle-dark-mode/toggle-dark-mode.component';
import { TranslateModule } from '@ngx-translate/core';
import { Dropdown } from 'flowbite';
import { APP_INFO } from '../../../app-info';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ToggleDarkModeComponent, TranslateModule, RouterLinkActive, UserComponent],
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('navBarBtn', { static: false }) navBarBtn!: ElementRef;
  @ViewChild('navBarDropdown', { static: false }) navBarDropdown!: ElementRef;

  readonly info = APP_INFO;
  navBarDropdownFlow!: Dropdown;

  navigation: NavigationRoute[] = [
    // { name: 'Features', link: '/', fragment: 'features' },
    // { name: 'Pricing', link: '/', fragment: 'pricing' },
    { name: 'Template', link: '/template' },
    // { name: 'Changelog', link: '/changelog' },
  ];

  ngAfterViewInit(): void {
    this.navBarDropdownFlow = new Dropdown(this.navBarDropdown.nativeElement, this.navBarBtn.nativeElement);
  }
  hideMenu() {
    this.navBarDropdownFlow.hide();
  }
}
