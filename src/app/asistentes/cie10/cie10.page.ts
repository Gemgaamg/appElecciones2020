import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
  selector: 'app-cie10',
  templateUrl: './cie10.page.html',
  styleUrls: ['./cie10.page.scss'],
})
export class Cie10Page implements OnInit {
  @Input() idform07;
  cod4_sel= {
    des_cod:""
  };
  cie10s = [];
  cie10Busqueda = "";
  constructor(
    protected hrzServerService: HrzServerService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarCie10();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  enviar() {
    console.log("enviar",this.cod4_sel);
    this.modalCtrl.dismiss(this.cod4_sel);
  }
  buscar(){
    this.cargarCie10();
  }
  trim(str){
    if(str){
      return str.trim();
    }
    return '';
    
  }
  limpiarBuscador(){
		this.cie10Busqueda="";
		// this.offset = 0;
		this.cargarCie10();
	}
  cargarCie10() {
    var self = this;
    let r = this.hrzServerService.queryGET({
      metodo: "getCie10s",
      cie10Busqueda: this.cie10Busqueda,
    }, 'serveragendamiento');
    r.subscribe(
      (s) => {
        
        if (s[0] != undefined) {
          this.cie10s = s;
          console.log(this.cie10s)
        } else {
          this.cie10s = []
        }
      });
  }

}
