import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

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
listItems=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataProvider:DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListPage');
    this.listItems=this.dataProvider.list;
  }

  onLogout() {

  }
}
