import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoServiceProvider } from '../todo/todo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-newlist',
  templateUrl: './newlist.page.html',
  styleUrls: ['./newlist.page.scss'],
})
export class NewlistPage implements OnInit {

  constructor(private camera: Camera, private todoServ : TodoServiceProvider) {}

  public title : string = "";
  public currentImage : any = null;
  public selectedPhoto;

  ngOnInit() {
  }

  create() {
    this.todoServ.createTodoList(this.title);
  }

  selectPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      this.upload();
    }, (err) => {
      console.log('error', err);
    });
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  }

  upload() {
    if (this.selectedPhoto) {
      var uploadTask = firebase.storage().ref().child('images/uploaded.png')
        .put(this.selectedPhoto);
      uploadTask.then((snapshot) => {
        this.currentImage = snapshot.downloadURL;
      }),
      (error) => {
        console.log("error", error);
      }
    }
  }

}
