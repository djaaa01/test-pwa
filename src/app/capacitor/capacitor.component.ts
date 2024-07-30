import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { EditPhotoComponent } from '../edit-photo/edit-photo.component';

@Component({
  selector: 'app-capacitor',
  standalone: true,
  imports: [RouterLink, NgIf, EditPhotoComponent],
  templateUrl: './capacitor.component.html',
  styleUrl: './capacitor.component.scss',
})
export class CapacitorComponent {
  picture: string;
  isEdit = false;
  @ViewChild(EditPhotoComponent) editPhotoComponent: EditPhotoComponent;

  async onCamera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.picture = image.dataUrl as string;
  }

  onEdit(): void {
    this.isEdit = true;
    setTimeout(() => {
      this.editPhotoComponent._createImageEditor(this.picture);
    }, 100);
  }
  
  onBack(): void {
    location.reload();
  }
}
