import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { AuthService } from '../../../../../auth/auth.service';
import { User } from '../../../../../auth/models/user.model';
import { NavigationRoute } from '@sf/utils/models/navigation.interface';

import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user',
  imports: [RouterLink, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private readonly _authService = inject(AuthService);

  constructor() {
    this._authService.autoLogin();
  }

  @ViewChild('userBtn', { static: false }) userBtn!: ElementRef;
  @ViewChild('userDropdown', { static: false }) userDropdown!: ElementRef;

  user!: User | null;

  userNavigation: NavigationRoute[] = [
    { name: 'Dashboard', link: '/admin/dashboard', icon: 'home' },
    { name: 'Settings', link: '/admin/settings', icon: 'settings' },
    { name: 'Earnings', link: '/admin/earnings', icon: 'attach_money' },
    { name: 'Sign out', link: '/auth/sign-out', icon: 'logout' },
  ];

  ngOnInit(): void {
    // get user from back-end
    this._authService.user$.subscribe((res) => {
      this.user = res;
    });
  }
}
