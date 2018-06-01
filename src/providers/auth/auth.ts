import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {UserCredential} from "@firebase/auth-types";
import * as firebase from "firebase";
import {User} from "firebase";
import {fromPromise} from "rxjs/observable/fromPromise";
import {Platform} from "ionic-angular";
import {TwitterConnect} from "@ionic-native/twitter-connect";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient,
              private twitterConnect: TwitterConnect,
              private platform: Platform) {
    console.log('Hello AuthProvider Provider');
  }

  loginWithGithub(): Promise<any> {
    const githubAuthProvider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(githubAuthProvider)
      .then((res) => {
        firebase.database()
          .ref(`/userProfile/${res.user.uid}`)
          .set({email: res.user.email, fname: res.user.displayName, lname: res.user.displayName})
        return res.user;
      })
      .catch((err) => {
        console.log('err Github',err)
      })
  }

  async loginWithGoogle(): Promise<any> {
    if (this.platform.is('cordove')) {
    }
    else {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(googleAuthProvider)
        .then((res) => {
          const tkn = res.credential.accessToken;
          console.log('token', tkn);
          const usr: User = res.user;
          console.log('user', usr);
          firebase.database()
            .ref(`/userProfile/${usr.uid}`)
            .set({email: usr.email, fname: usr.displayName, lname: usr.displayName})
          return usr;
        })
        .catch(err => {
          var errCode = err.code;
          console.log('errCode', errCode)
          var message = err.message;
          console.log('message', message)
          var email = err.email;
          console.log('email', email)
          var credential = err.credential;
          console.log('credential', credential)
        })
    }
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

  async createNewUser(email, pwd, fn, ln): Promise<any> {
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
    return fromPromise(this.createNewUser(email, pwd, fn, ln))
  }

  loginWithTwitter(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.twitterConnect.login()
        .then((res) => {
          console.log('res', res)
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
    else {
      const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
      return firebase.auth().signInWithPopup(twitterAuthProvider)
        .then((res) => {
          console.log('res', res)
        })
        .catch((err) => {
          console.log('err', err)
        })
    }

  }
}
