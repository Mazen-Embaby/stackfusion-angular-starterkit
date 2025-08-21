import { Component } from '@angular/core';
import { NavigationRoute } from './navigation.model';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleDarkModeComponent } from '../toggle-dark-mode/toggle-dark-mode.component';
import { TranslateModule } from '@ngx-translate/core';
import { APP_INFO } from '../../../app-info';
import { UserComponent } from '../user/user.component';
import { Dropdown, DropdownContent } from '@sf/dropdown';
import { NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    ToggleDarkModeComponent,
    TranslateModule,
    RouterLinkActive,
    UserComponent,
    Dropdown,
    DropdownContent,
    NgpMenuTrigger,
  ],
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly info = APP_INFO;

  navigation: NavigationRoute[] = [
    // { name: 'Features', link: '/', fragment: 'features' },
    // { name: 'Pricing', link: '/', fragment: 'pricing' },
    { name: 'Template', link: '/template' },
    // { name: 'Changelog', link: '/changelog' },
  ];
}
