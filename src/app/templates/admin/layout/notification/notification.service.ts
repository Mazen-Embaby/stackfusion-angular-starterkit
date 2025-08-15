import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotificationData } from './notification.data';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _httpClient = inject(HttpClient);

  notifications$ = of(NotificationData);

  getAllNotifications(): Observable<Notification[]> {
    return this.notifications$;
  }

  toggleRead(notification: Notification) {
    notification.isRead = !notification.isRead;
  }

  delete(id: string | number) {
    NotificationData.splice(
      NotificationData.findIndex((n) => n.id === id),
      1,
    );
  }
}
