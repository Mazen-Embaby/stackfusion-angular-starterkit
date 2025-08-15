import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../auth/models/user.model';
import { NavigationRoute } from '../header/navigation.model';

import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { NgpMenuTrigger } from 'ng-primitives/menu';
import { Dropdown, DropdownContent, DropdownItem } from '../../../../@sf/dropdown';
@Component({
  selector: 'app-user',
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgpMenuTrigger,
    Dropdown,
    DropdownContent,
    DropdownItem,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private readonly _authService = inject(AuthService);

  constructor() {
    this._authService.autoLogin();
  }

  user!: User | null;

  userNavigation: NavigationRoute[] = [
    { name: 'Templates', link: '/template/', icon: 'apps' },
    // { name: 'Sign out', link: '/auth/sign-out', icon: 'logout' },
  ];

  ngOnInit(): void {
    // get user from back-end
    this._authService.user$.subscribe((res) => {
      this.user = res;
    });
  }
}
