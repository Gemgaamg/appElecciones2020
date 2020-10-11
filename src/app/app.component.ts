import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import {Plugins, StatusBarStyle} from '@capacitor/core';
import { HrzServerService } from './api/hrz-server.service';

// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    protected hrzServerService: HrzServerService
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     // this.splashScreen.hide();
  //   });
  // }
  async initializeApp(){
    const { SplashScreen, StatusBar } = Plugins;
    try{
      await SplashScreen.hide();
      await StatusBar.setStyle({style: StatusBarStyle.Light});
      if(this.platform.is('android')){
        StatusBar.setBackgroundColor({color:'#CDCDCD'});
      }
    }catch(err){
      console.log('This is normal in a browser', err);
    }
    this.platform.resume.subscribe(() => {
        this.hrzServerService.getEstado();
        console.log('****resumen aplicion****');
    });
  }
}
