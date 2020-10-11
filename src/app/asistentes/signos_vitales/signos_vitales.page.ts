import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ImagenPage } from '../imagen/imagen.page';

@Component({
  selector: 'app-signos_vitales',
  templateUrl: './signos_vitales.page.html',
  styleUrls: ['./signos_vitales.page.scss'],
})
export class SignosVitalesPage implements OnInit {
  nanda_sel = {
    nombre: ""
  };
  idpre;
  idtarea_detalle = null;
  historial = [];
  confirmado = null;
  nuevo = {
    saturacion: 100
  };
  solo_seleccionar = false;
  tipo = 1;
  habi_boton_agregar = null;
  nandas = [];
  nandaBusqueda = "";


  constructor(
    protected hrzServerService: HrzServerService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    // this.cargarNanda();
    this.nuevo = {
      saturacion: 60
    }
    if (this.solo_seleccionar == true ){
      this.tipo = 0;
      this.obtenerHistorialSignos()
    }
    


  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
  enviar() {
    console.log("enviar", this.nanda_sel);
    this.modalCtrl.dismiss(this.nanda_sel);
  }
  trim(str) {
    if (str) {
      return str.trim();
    }
    return '';

  }
  getSrcGrafico(){
    return  `${this.hrzServerService.url_server}/reportes_emergencia?reporte=graficoSignosVitales&idpre=${this.idpre}&t=1588275397479`;
  }
  async verGrafico() {
    const modal  = await this.modalCtrl.create({
      component: ImagenPage,
      componentProps:{
        src:this.getSrcGrafico()
      }
    })
    await modal.present();

		const { data } = await modal.onDidDismiss();
  }

  obtenerHistorialSignos() {
    var self = this;
    let r = this.hrzServerService.query({
      metodo   : "obtenerSignosVitalesPorPreparacion",
      idpre    : self.idpre,
      completo : self.tipo==1?true:false,
    }, 'servepre_enfermeria');
    r.subscribe(
      (s) => {
        
        self.historial = s;
      });
  }

}
