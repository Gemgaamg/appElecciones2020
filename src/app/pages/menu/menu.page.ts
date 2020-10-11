import { Component, OnInit } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { Usuario } from 'src/app/api/usuario';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  children = [
    // {
    //   title: 'Bodega',
    //   url: '/menu/bodega',
    //   icon: 'logo-ionic'
    // },
    // {
    //   title: 'Bodega 2',
    //   url: '/menu/bodega',
    //   icon: 'logo-google'
    // },
  ];
  pages = [
    {
      title: 'Inicio',
      url: '/menu/main',
      icon: 'home'
    },
    {
      title: 'Historia clinica de pacientes',
      url: '/menu/pacientes',
      icon: 'happy'
    },
    {
      title: 'Modulos',
      children: this.children,
    }
  ];
  //children = [];
  usuario: Usuario;
  constructor(public navCtrl: NavController, protected hrzServerService: HrzServerService) { 
    this.usuario = hrzServerService.usuario;
    let r = this.hrzServerService.query({
      acc:"getPermisos",
    },'app_administracion');
    r.subscribe(
      (arrayControles) => {
        this.renderPages(arrayControles);
      });
    this.hrzServerService.getEstado();
  }

  renderPages(arrayControles){
    this.children.push({
      title: 'Ingreso de Actas',
      url: `/menu/ingreso_acta`,
      icon: 'person'
    });
    Object.entries(arrayControles).forEach(
      ([key, ctrl]) => {
        // console.log(key, ctrl)
        
        this.children.push({
          title: ctrl['nmodulo'],
          url: `/menu/${ctrl['ncontrol'].toLowerCase()}`,
          icon: ctrl['icon']
        });
        
      }
    );
  }
  ngOnInit() {
  }

  logOut(){
    this.hrzServerService.query({
      acc:"logOut",
    },'app_administracion').subscribe(
      (response) => {
        if(response == 'OK'){
          this.navCtrl.navigateForward("login");
        }
        
        
      }
    );
  }

}
