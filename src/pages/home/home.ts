import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onCreate() {
    this.navCtrl.push('CreateAccountPage')
  }

  onLogin() {
    this.navCtrl.push('LoginPage')

  }
}
