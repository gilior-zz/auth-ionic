import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "@firebase/auth-types";
import * as firebase from "firebase";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  async signUpUser(email, pwd, fn, ln): Promise<any> {
    try {
      const newUser: User = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd)

      await firebase.database()
        .ref(`/userProfile/${newUser.uid}`)
        .set({email: email, fname: fn, lname: ln})

      return newUser;

    }
    catch (err) {
      throw  err;
    }
  }

}
