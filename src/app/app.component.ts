import { ConstantPool } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from './image-cropper/interfaces/index';
import { base64ToFile } from './image-cropper/utils/blob.utils';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  imgURL =
    'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtaWxlJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60';
  showCropper = false;
  containWithinAspectRatio = true;
  transform: ImageTransform = {};

  fileChangeEvent(event: any): void {
    var e = JSON.stringify(event);
    console.log(e);
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent | any) {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    this.showCropper = true;
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    this.showCropper = false;
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }
  ngOnInit() {
    this.fileChangeEvent({
      imageURL:
        'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtaWxlJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    });
  }
}
