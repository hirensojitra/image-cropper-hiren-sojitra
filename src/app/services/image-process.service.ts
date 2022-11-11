import { Injectable } from '@angular/core';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from '../image-cropper/interfaces/index';
import { base64ToFile } from '../image-cropper/utils/blob.utils';
@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {
  constructor() { }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  imgURL:string = '';
  showCropper = false;
  containWithinAspectRatio = true;
  transform: ImageTransform = {};

  public fileChangeEvent(event: any): void {
    var e = JSON.stringify(event);
    console.log(e);
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent | any) {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64));
  }

  public imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  public cropperReady(sourceImageDimensions: Dimensions) {
    this.showCropper = true;
    console.log('Cropper ready', sourceImageDimensions);
  }

  public loadImageFailed() {
    this.showCropper = false;
    console.log('Load failed');
  }

  public rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  public rotateRight() {
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

  public flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  public flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  public resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  public zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  public zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  public toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  public updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }
}
