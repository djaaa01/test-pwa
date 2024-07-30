import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { PushNotificationService } from '../services/push-notifi.service';
import { EditPhotoComponent } from '../edit-photo/edit-photo.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { CameraIconComponent } from '../camera-icon/camera-icon.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
