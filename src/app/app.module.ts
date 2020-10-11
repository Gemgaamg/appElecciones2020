import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HrzServerService } from './api/hrz-server.service';
import { HttpClientModule } from '@angular/common/http';
import { TextAreaAutosizeModule } from './autosize.directive';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule, 
    AppRoutingModule, 
    TextAreaAutosizeModule
    // ChangeColorModule,
  ],
  providers: [
    // StatusBar,
    HrzServerService,
    ScreenOrientation,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports:[
    TextAreaAutosizeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
