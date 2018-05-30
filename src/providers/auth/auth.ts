import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {UserCredential} from "@firebase/auth-types";
import * as firebase from "firebase";
import {fromPromise} from "rxjs/observable/fromPromise";

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

  loginUser(email, pwd): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, pwd);
  }

  signout(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          let loggedOut = true;
          resolve(loggedOut)
        })
        .catch((error: any) => {
          reject(error);
        })
    })
  }

  async signUpUser(email, pwd, fn, ln): Promise<any> {
    try {
      const newUser: UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd)

      await firebase.database()
        .ref(`/userProfile/${newUser.user.uid}`)
        .set({email: email, fname: fn, lname: ln})

      return newUser;

    }


    catch (err) {
      return Promise.reject(new Error('reason'));
    }
  }

  foo(email, pwd, fn, ln): Observable<any> {
    return fromPromise(this.signUpUser(email, pwd, fn, ln))
  }

}
