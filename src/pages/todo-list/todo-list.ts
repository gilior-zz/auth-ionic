import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the TodoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {
  listItems = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataProvider: DataProvider,
              private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListPage');
    this.listItems = this.dataProvider.list;
  }

  onLogout() {
    this.authProvider.signout()
      .then((isLoggedOut: boolean) => {
        if (isLoggedOut) {
          this.navCtrl.setRoot('HomePage')
        }
      })
      .catch((err:any)=>{
      console.log(err)
      })
  }
}
