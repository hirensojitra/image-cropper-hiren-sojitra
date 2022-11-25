import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageProcessService } from './services/image-process.service';

import * as htmlToImage from 'html-to-image';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


export interface DialogData {
  animal: string;
  name: string;
}
export interface PosterType {
  type: string,
  style: number
}
interface Village {
  viewValue: string;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  // HTTP Redirection
  location: Location;

  
  selectedFile:File;
  onFileSelected(e:any){
    this.selectedFile = <File>e.target.files[0]
  }
  uploadFile(){
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    this.http.post('https://us-central1-personal-portfolio-demo.cloudfunctions.net/uploadFile',fd).subscribe(res=>{
      console.log(res);
    });
  }
  posterType: PosterType = { type: '', style: 0 };
  animal: string = '';
  name: string = '';
  cropedImg: string = '';
  imgSelected: string = '';
  amreli: Village[] = [
    { viewValue: 'અમરેલી શહેર' },
    { viewValue: 'જેસિંગપરા' },
    { viewValue: 'અમરપુર વરૂડી' },
    { viewValue: 'અમરેલી' },
    { viewValue: 'આંકડીયા નાના' },
    { viewValue: 'મોટા આંકડીયા' },
    { viewValue: 'ઇશ્વરીયા' },
    { viewValue: 'કમીગઢ' },
    { viewValue: 'કાઠમા' },
    { viewValue: 'કેરાળા' },
    { viewValue: 'કેરીયાચાડ' },
    { viewValue: 'કેરીયાનાગસ' },
    { viewValue: 'ખડખંભાળીયા' },
    { viewValue: 'ખીજડીયા ખારી' },
    { viewValue: 'ખીજડીયા રાદડીયા' },
    { viewValue: 'ગાવડકા' },
    { viewValue: 'ગીરીયા' },
    { viewValue: 'ગોખરવાળા નાના' },
    { viewValue: 'ગોખરવાળા મોટા' },
    { viewValue: 'ચક્કરગઢ' },
    { viewValue: 'ચાડીયા' },
    { viewValue: 'ચાંદગઢ' },
    { viewValue: 'ચાંપાથળ' },
    { viewValue: 'ચિત્તલ' },
    { viewValue: 'જશવંતગઢ' },
    { viewValue: 'જાળીયા' },
    { viewValue: 'ટીંબલા' },
    { viewValue: 'ટીંબા' },
    { viewValue: 'ઢોલરવા' },
    { viewValue: 'તરકતળાવ' },
    { viewValue: 'તરવડા' },
    { viewValue: 'થોરડી' },
    { viewValue: 'દહીંડા' },
    { viewValue: 'દેવરાજીયા' },
    { viewValue: 'દેવળીયા' },
    { viewValue: 'નવા ખીજડીયા' },
    { viewValue: 'પાણીયા' },
    { viewValue: 'પીઠવાજાળ' },
    { viewValue: 'પીપળલગ' },
    { viewValue: 'ફતેપુર' },
    { viewValue: 'બક્ષીપુર' },
    { viewValue: 'બાબાપુર' },
    { viewValue: 'ભંડારીયા નાના' },
    { viewValue: 'ભંડારીયા મોટા' },
    { viewValue: 'માચીયાળા નાના' },
    { viewValue: 'માચીયાળા મોટા' },
    { viewValue: 'માલવણ' },
    { viewValue: 'માળીલા' },
    { viewValue: 'માંગવાપાળ' },
    { viewValue: 'માંડવડા નાના' },
    { viewValue: 'માંડવડા મોટા' },
    { viewValue: 'મેડી' },
    { viewValue: 'મોણપુર' },
    { viewValue: 'રાજસ્‍થળી' },
    { viewValue: 'રાંઢીયા' },
    { viewValue: 'રીકડીયા' },
    { viewValue: 'રંગપુર' },
    { viewValue: 'લાપાળિયા' },
    { viewValue: 'લાલાવદર' },
    { viewValue: 'વડેરા' },
    { viewValue: 'વરસડા' },
    { viewValue: 'વાંકીયા' },
    { viewValue: 'વિઠ્ઠલપુર' },
    { viewValue: 'વેણીવદર' },
    { viewValue: 'શેડુભાર' },
    { viewValue: 'શંભુપરા' },
    { viewValue: 'સણોસરા' },
    { viewValue: 'સરંભડા' },
    { viewValue: 'સાજીયાવદર' },
    { viewValue: 'સાંગાડેરી' },
    { viewValue: 'સુરગપુર' },
    { viewValue: 'સોનારીયા' },
    { viewValue: 'હરીપુરા' }
  ];
  kukavav: Village[] = [
    { viewValue: 'અમરાપુર' },
    { viewValue: 'અનીડા' },
    { viewValue: 'અરજણસુખ' },
    { viewValue: 'બાદનપુર જુના' },
    { viewValue: 'બાદનપુર નવા' },
    { viewValue: 'બાંભણીયા' },
    { viewValue: 'બાંટવા દેવળી' },
    { viewValue: 'બરવાળા બાવળ' },
    { viewValue: 'બરવાળા બાવીશી' },
    { viewValue: 'ભાયાવદર' },
    { viewValue: 'ભુખલી સાંથળી' },
    { viewValue: 'દડવા રાંદલ' },
    { viewValue: 'દેવળકી' },
    { viewValue: 'દેવગામ' },
    { viewValue: 'ઇશ્વરીયા' },
    { viewValue: 'જીથુડી' },
    { viewValue: 'જંગર' },
    { viewValue: 'ખડખડ' },
    { viewValue: 'ખજુરી' },
    { viewValue: 'ખજુરી પીપળીયા' },
    { viewValue: 'ખાખરીયા' },
    { viewValue: 'ખીજડીયા હનુમાન' },
    { viewValue: 'ખીજડીયા ખાન' },
    { viewValue: 'કોલડા' },
    { viewValue: 'કુંકાવાવ મોટી' },
    { viewValue: 'કુંકાવાવ નાની' },
    { viewValue: 'લાખાપાદર' },
    { viewValue: 'લુણીધાર' },
    { viewValue: 'માયાપાદર' },
    { viewValue: 'મેધા પીપળીયા' },
    { viewValue: 'મોરવાડા' },
    { viewValue: 'નાજાપુર' },
    { viewValue: 'પીપળીયા ધુંધીયા' },
    { viewValue: 'રામપુર' },
    { viewValue: 'સનાળા' },
    { viewValue: 'સનાળી' },
    { viewValue: 'સારંગપુર' },
    { viewValue: 'સુર્ય પ્રતાપગઢ' },
    { viewValue: 'તાલાળી' },
    { viewValue: 'તરધરી' },
    { viewValue: 'તોરી' },
    { viewValue: 'ઉજળા મોટા' },
    { viewValue: 'ઉજળા નાના' },
    { viewValue: 'વડીયા' },
    { viewValue: 'વાવડી' }
  ];
  vill = [this.amreli, this.kukavav]

  selectImg(e: any, t: string, s: number) {
    this.imgSelected = e;
    this.posterType.style = s;
    this.posterType.type = t;
  }
  reset() {
    this.imgSelected = '';
    this.cropedImg = '';
    this.downLoadLink = false;
    this.posterType.style = 0;
    this.posterType.type = '';
  }
  downLoadLink: boolean = false;
  generateImage() {
    var node: any = document.getElementById('print-area');
    var link: any = document.getElementById('print-area-link');
    this.downLoadLink = true;
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        console.log(link)
        link.setAttribute('href', dataUrl);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cropedImg = (result) ? result : this.cropedImg;
      localStorage.setItem('profilePicture', this.cropedImg);
    });
  }
  constructor(private http: HttpClient, public image: ImageProcessService, public dialog: MatDialog, private formBuilder: FormBuilder) {

  }
  post: any = '';
  formGroup: FormGroup = this.formBuilder.group({
    'village': [null, [Validators.required]],
    'name': [null, Validators.required],
    'taluka': [0, Validators.required]
  });
  ngOnInit() {
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
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
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
