import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  list = [
    {itemName: 'milk', checked: false},
    {itemName: 'cheeze', checked: true},
    {itemName: 'bread', checked: false}
  ]

  constructor(public http: HttpClient,) {
    console.log('Hello DataProvider Provider');
  }

}
