import { Component, inject } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

import { NavigationRoute } from '@sf/utils/models/navigation.interface';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageComponent } from '../language/language.component';
import { NotificationComponent } from '../notification/notification.component';
import { UserComponent } from '../user/user.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { ToggleDarkModeComponent } from '../toggle-dark-mode/toggle-dark-mode.component';
import { APP_INFO } from '../../../../app-info';
import { Dropdown, DropdownContent } from '@sf/dropdown';
import { NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    LanguageComponent,
    NotificationComponent,
    UserComponent,
    TranslatePipe,
    ToggleDarkModeComponent,
    Dropdown,
    DropdownContent,
    NgpMenuTrigger,
  ],
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private sideBarService = inject(SidebarService);

  readonly info = APP_INFO;

  navigation: NavigationRoute[] = [
    { name: 'Kanban', link: '/template/live/admin/app/kanban' },
    { name: 'Event', link: '/template/live/admin/app/event' },
    { name: 'Ecommerce', link: '/template/live/admin/app/ecommerce' },
    { name: 'Ticket', link: '/template/live/admin/app/ticket' },
  ];

  toggleSideBar() {
    this.sideBarService.drawer.toggle();
  }
}
