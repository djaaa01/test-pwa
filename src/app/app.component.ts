import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { SwPush } from '@angular/service-worker';
import { NgIf } from '@angular/common';
import { CameraIconComponent } from './camera-icon/camera-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, CameraIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private notificationService: NotificationService, readonly swPush: SwPush) {}

  title = 'test-pwa';
  deferredPrompt: any;
  showInstallButton: boolean = false;
  currentStream: MediaStream | null = null;
  isFrontCamera: boolean = true;

  
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;

  ngOnInit(): void {
    this.notificationService.requestPermission();
  }

  notify(): void {
    this.notificationService.showNotification('Notificare PWA', {
      body: 'Bommmba !!!!!!',
    });
  }

  installPWA() {
    // Hide the install button
    this.showInstallButton = false;
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }

  async startCamera() {
    this.stopCamera();

    const constraints = {
      video: {
        facingMode: this.isFrontCamera ? 'user' : 'environment'
      }
    };

    try {
      this.currentStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.nativeElement.srcObject = this.currentStream;
      this.videoElement.nativeElement.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  switchCamera() {
    this.isFrontCamera = !this.isFrontCamera;
    this.startCamera();
  }
  
  stopCamera() {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
      this.currentStream = null;
      this.videoElement.nativeElement.srcObject = null;
    }
  }

  takePicture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      this.downloadImage(dataUrl);
    }
  }

  downloadImage(dataUrl: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'picture.png';
    link.click();
  }
}
