import { Component } from '@angular/core';
import { HrzServerService } from '../api/hrz-server.service';
import {  NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  estado:string ;
  constructor(public navCtrl: NavController,protected hrzServerService: HrzServerService,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(0, () => {
   
        navigator['app'].exitApp();
     
    });
  }
  ngOnInit() {
    let r = this.hrzServerService.getEstado();
    
    r.subscribe(
      (response) => {
        console.log(response)
        if(response.estado==='CONECTADO'){
          this.navCtrl.navigateForward("menu/main");
        }
      });
  }
  logIn(cedula:string, clave:string, event:Event) {

    let r = this.hrzServerService.logIn(cedula,clave);
    
    r.subscribe(
      (response) => {
        console.log(response)
        if(response[0]['estado']==='OK'){
          this.navCtrl.navigateForward("menu/main");
        }
      });

    
  }

  getEstado(){
    this.hrzServerService.query({
      acc:"estado",
    },'app_administracion').subscribe(
      (response) => {
        // console.log(`${response}`);
        this.estado = response;
        // return response;
      }
    );
  }

  logOut(){
    this.hrzServerService.query({
      acc:"logOut",
    },'app_administracion').subscribe(
      (response) => {
        console.log(`${response}`);
      }
    );
  }

  pruebaObjeto(){
    this.hrzServerService.query({
      acc:"pruebaObjeto",
    },'app_administracion').subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
