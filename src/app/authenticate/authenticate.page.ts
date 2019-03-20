import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user/auth.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  mail: string = "";
  pass: string = "";

  constructor(private auth: AuthService, private navctrl : NavController,private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  login() {
    this.auth.loginUser(this.mail, this.pass).then(
      () => {
        console.log("Login Success")
        this.navctrl.navigateForward('/tabs/tab2');
      },
      error => {
        this.mail = error.toString();
      }
    );
  }

  loginGPlus() {
    this.auth.loginGooglePlus().then(
      () => {
        console.log("Login Success");
        this.navctrl.navigateForward('/tabs/tab2');
      },
      error => {
        this.mail = error.toString();
      }
    );
  }

  loginFacebook() {
    this.auth.loginFacebook().then(
      () => {
        console.log("Login Success");
        this.navctrl.navigateForward('/tabs/tab2');
      },
      error => {
        this.mail = JSON.stringify(error);
      }
    );
  }
}
