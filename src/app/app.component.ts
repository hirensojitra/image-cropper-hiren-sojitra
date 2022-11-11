import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ImageProcessService } from './services/image-process.service';
export interface DialogData {
  animal: string;
  name: string;
}

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  animal: string = '';
  name: string = '';
  cropedImg: string = '';
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cropedImg = (result)?result:this.cropedImg;
    });
  }
  constructor(public image: ImageProcessService, public dialog: MatDialog){
    
  }
  ngOnInit() {
    // this.fileChangeEvent({
    //   imageURL:
    //     'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtaWxlJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    // });
  }
}
@Component({
  selector: 'img-dialog',
  templateUrl: 'img-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public image: ImageProcessService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
