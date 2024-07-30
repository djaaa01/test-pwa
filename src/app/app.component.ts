import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { NgIf } from '@angular/common';
import { CameraIconComponent } from './camera-icon/camera-icon.component';
import ImageEditor from 'tui-image-editor';
import { PushNotificationService } from './services/push-notifi.service';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  title = 'test-pwa';
}
