import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-pwa';

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.requestPermission();
  }

  notify(): void {
    this.notificationService.showNotification('Notificare PWA', {
      body: 'Bommmba !!!',
    });
  }
}
