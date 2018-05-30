import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              private authProvider: AuthProvider,
              private  loadingController: LoadingController,
              private  alertController: AlertController) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async onSubmit(): Promise<void> {
    console.log('loginForm', this.loginForm.value)
    let loadingController = this.loadingController.create({content: 'signing in...'})
    loadingController.present();
    try {
      let l = await this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.pwd)
      await loadingController.dismissAll();
      this.navCtrl.setRoot('TodoListPage');

    }
    catch (err) {
      await loadingController.dismissAll();
      let alertController = this.alertController.create({message: err});
      alertController.present();
    }


  }

}
