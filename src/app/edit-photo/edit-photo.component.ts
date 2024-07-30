import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import ImageEditor from 'tui-image-editor';

@Component({
  selector: 'app-edit-photo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './edit-photo.component.html',
  styleUrl: './edit-photo.component.scss',
})
export class EditPhotoComponent {
  _tuiImageEditor!: ImageEditor;
  @ViewChild('tuiRef') _tuiRef!: ElementRef<HTMLDivElement>;

  public _createImageEditor(image: string) {
    this._tuiImageEditor = new ImageEditor(this._tuiRef.nativeElement, {
      includeUI: {
        loadImage: {
          path: image,
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
}
