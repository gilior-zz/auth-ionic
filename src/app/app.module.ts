import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { DataProvider } from '../providers/data/data';
import { AuthProvider } from '../providers/auth/auth';
import {HttpClientModule} from "@angular/common/http";
import {GooglePlus} from "@ionic-native/google-plus";
import {TwitterConnect} from "@ionic-native/twitter-connect";


@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AuthProvider,
    GooglePlus,
    TwitterConnect
  ]
})
export class AppModule {}
