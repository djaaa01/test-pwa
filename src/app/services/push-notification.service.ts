import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  readonly VAPID_PUBLIC_KEY = 'BGVAZbJWakz0omywUpcDqLHYRETFOM4_W4X5ZZsoTD6Wc45fpOs7t-JFLy2_NnVYS0_-t4noUQ_xk9u_Wit8_eg';

  constructor(private swPush: SwPush, private http: HttpClient) { }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.sendSubscriptionToTheServer(sub))
    .catch(err => console.error('Could not subscribe to notifications', err));
  }

  private sendSubscriptionToTheServer(subscription: PushSubscription) {
    this.http.post('https://your-server.com/api/subscribe', subscription)
      .subscribe(
        response => console.log('Subscription sent to server'),
        err => console.error('Could not send subscription to server', err)
      );
  }
}