import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Dropdown } from 'flowbite';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  imports: [NgClass, RouterLink, DatePipe, MatIconModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements AfterViewInit, OnInit {
  private _notificationService = inject(NotificationService);

  @ViewChild('notificationBtn', { static: false }) notificationBtn!: ElementRef;
  @ViewChild('notificationDropDown', { static: false })
  notificationDropDown!: ElementRef;

  notifications: Notification[] = [];
  totalUnread = 0;

  ngOnInit(): void {
    this._notificationService.getAllNotifications().subscribe((res) => {
      this.notifications = res;
      this.totalUnread = res.filter((res) => !res.isRead).length;
    });
  }

  ngAfterViewInit(): void {
    new Dropdown(this.notificationDropDown.nativeElement, this.notificationBtn.nativeElement);
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
