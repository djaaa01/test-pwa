import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          console.log('Permission granted');
        } else {
          console.log('Permission denied');
        }
      });
    }
  }

  showNotification(title: string, options?: NotificationOptions): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }
}