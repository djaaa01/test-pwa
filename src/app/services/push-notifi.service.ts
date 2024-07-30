import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  readonly VAPID_PUBLIC_KEY = 'qh3HCeFKlOw3yQoDeq3kh0ZQ4KqrsZ4BILtj5UlBqxI';

  constructor(private swPush: SwPush) {}

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log('Subscription received: ', sub);
      // Send the subscription object to the server
    })
    .catch(err => console.error('Could not subscribe to notifications', err));
  }

  listenForNotifications() {
    this.swPush.messages.subscribe(message => {
      console.log('Received message: ', message);
    });

    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      console.log('Action: ', action);
      console.log('Notification: ', notification);
    });
  }
}