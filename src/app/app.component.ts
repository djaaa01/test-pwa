import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { NgIf } from '@angular/common';
import { CameraIconComponent } from './camera-icon/camera-icon.component';
import ImageEditor from 'tui-image-editor';
import { PushNotificationService } from './services/push-notifi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, CameraIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  constructor(private notificationService: NotificationService, private pushService: PushNotificationService) {}
  private _tuiImageEditor!: ImageEditor;

  image: string = '';

  title = 'test-pwa';
  deferredPrompt: any;
  showInstallButton: boolean = false;
  currentStream: MediaStream | null = null;
  isFrontCamera: boolean = true;
  isEdit = false;

  
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  @ViewChild('tuiRef') private _tuiRef!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.notificationService.requestPermission();

    this.pushService.subscribeToNotifications();
    this.pushService.listenForNotifications();
  }

  ngAfterViewInit(): void {
  }

  private _createImageEditor() {
    this._tuiImageEditor = new ImageEditor(this._tuiRef.nativeElement, {
      includeUI: {
        loadImage: {
          path: this.image,
          name: 'SampleImage',
        },
        initMenu: 'filter',
        menuBarPosition: 'bottom',
      },
      cssMaxWidth: 700,
      cssMaxHeight: 500,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70,
      },
    });


    // Add a picture into your assets folder to test.
    this._tuiImageEditor.loadImageFromURL('', 'My example picture');
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
    this.image = '';
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
      this.image = canvas.toDataURL('image/png');
      this.stopCamera();
      // this.downloadImage(dataUrl);
    }
  }

  downloadImage(dataUrl: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'picture.png';
    link.click();
  }

  onBack(): void {
    location.reload();
  }

  onEdit(): void {
    this.isEdit = true;
    this._createImageEditor();
  }
}
