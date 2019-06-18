import { Component, PipeTransform, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { DecimalPipe } from '@angular/common';

// import { FormControl } from '@angular/forms';

// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';

import { DataImage, Image, ImageRequestContainerCreate } from '../images';
import { Alert } from '../utils'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss'],
  providers: [DecimalPipe]
})
export class ImagesListComponent implements OnInit {

  closeResult: string;
  images: Image;
  imageSelected: Image;
  containerCommandSelected: string;
  formContainerCreate: ImageRequestContainerCreate;

  // const Image: Image;
  // const Images: DataImage = {'data' : Image};
  alerts: Alert[] = []
  selectedImage;
  constructor(public dataService: DataService, private modalService: NgbModal) {
    this.formContainerCreate = new ImageRequestContainerCreate();
   }

  ngOnInit() {
      this.listImages();
  }

  open(content, image) {
    this.formContainerCreate = new ImageRequestContainerCreate();
    this.formContainerCreate['imageId'] = image

    this.imageSelected = image
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  public listImages(){
      this.alerts = [];
      this.dataService.getImages()
      .subscribe(
        (response) => {
          this.images = response.data;
        }, 
        e => { 
          this.showError('Error list Images') 
        }
      );
  }

  // public selectImage(Image){
  // this.selectedImage = Image;
  // }

  public actionImage(action, imageId, imageName){
  this.dataService.actionImages(action, imageId)
      .subscribe(
        (response) => {
          this.listImages();
        }, 
        e => { 
          this.showError('Error '+action+' image ') 
        }
      );
  }

  public saveImage(imageId){
    // console.log(this.containerCommandSelected);
    // console.log(imageId)
    this.dataService.saveImageContainerCreate(this.formContainerCreate)
    .subscribe(
      (response) => {
        this.listImages();
      }, 
      e => { 
        this.showError('Error create container for image ') 
      }
    ).add(() => {
      this.modalService.dismissAll();
    });
  }

  public showError(msgError){
    this.alerts.push({
      type: 'danger',
      message: msgError,
    })
  }

  public close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }


}