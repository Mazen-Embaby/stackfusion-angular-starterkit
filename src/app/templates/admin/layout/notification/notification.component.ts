import { Component, OnInit, inject } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Dropdown, DropdownContent } from '@sf/dropdown';
import { NgpMenuTrigger } from 'ng-primitives/menu';

@Component({
  selector: 'app-notification',
  imports: [
    NgClass,
    RouterLink,
    DatePipe,
    MatIconModule,
    Dropdown,
    DropdownContent,
    NgpMenuTrigger,
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  private _notificationService = inject(NotificationService);

  notifications: Notification[] = [];
  totalUnread = 0;

  ngOnInit(): void {
    this._notificationService.getAllNotifications().subscribe((res) => {
      this.notifications = res;
      this.totalUnread = res.filter((res) => !res.isRead).length;
    });
  }

  toggleRead(notification: Notification) {
    this._notificationService.toggleRead(notification);
    this.totalUnread = this.notifications.filter((res) => !res.isRead).length;
  }

  delete(id: string | number) {
    this._notificationService.delete(id);
    this.totalUnread = this.notifications.filter((res) => !res.isRead).length;
  }
}
