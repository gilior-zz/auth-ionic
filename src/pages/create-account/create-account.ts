import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  registerForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              private authProvider: AuthProvider,
              private loadingController: LoadingController,
              private alertController: AlertController) {
    this.registerForm = this.formBuilder.group({
      fname: ['a', [Validators.required]],
      lname: ['b', [Validators.required]],
      pwd: [parseInt(Math.random() * 10000000).toString() , [Validators.required]],
      email: ['c@c.com', [Validators.required, Validators.email]],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

  onSubmit() {
    let loading = this.loadingController.create({content: 'onSubmit'});
    loading.present();
    console.log('registerForm', this.registerForm.value);
    this.authProvider.signUpUser(
      this.registerForm.value.email,
      this.registerForm.value.pwd,
      this.registerForm.value.fname,
      this.registerForm.value.lname,
    )
      .then(authData => {
        loading.dismissAll();
        this.navCtrl.setRoot('TodoListPage')
      })
      .catch(
        error2 => {
          let alert = this.alertController.create(
            {
              message: error2,
              buttons: [
                {text: 'ok', role: 'cancel'}
              ]
            });
          alert.present();
        })


  }

}
