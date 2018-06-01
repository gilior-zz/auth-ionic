import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private authProvider: AuthProvider,
              private  loadingController: LoadingController,
              private  alertController: AlertController) {

  }

  onCreate() {
    this.navCtrl.push('CreateAccountPage')
  }

  onLogin() {
    this.navCtrl.push('LoginPage')

  }

  googleLogin() {
    const loadingController = this.loadingController.create();
    loadingController.present();
    this.authProvider.loginWithGoogle()
      .then(() => {
        loadingController.dismissAll();
        this.navCtrl.setRoot('TodoListPage')
      })
      .catch((err) => {
        loadingController.dismissAll();
        const alertController = this.alertController.create({message: err});
        alertController.present();
      })
  }

  onTwitterLogin() {
    const loadingController = this.loadingController.create();
    loadingController.present();
    this.authProvider.loginWithTwitter()
      .then(() => {
        loadingController.dismissAll();
        this.navCtrl.setRoot('TodoListPage')
      })
      .catch((err) => {
        loadingController.dismissAll();
        const alertController = this.alertController.create({message: err});
        alertController.present();
      })
  }
}
