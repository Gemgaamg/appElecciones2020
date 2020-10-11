import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
  selector: 'app-nanda',
  templateUrl: './nanda.page.html',
  styleUrls: ['./nanda.page.scss'],
})
export class NandaPage implements OnInit {
  nanda_sel= {
    nombre:""
  };
  idform05;
  nandas = [];
  nandaBusqueda = "";
  constructor(
    protected hrzServerService: HrzServerService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarNanda();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  enviar() {
    console.log("enviar",this.nanda_sel);
    this.modalCtrl.dismiss(this.nanda_sel);
  }
  buscar(){
    this.cargarNanda();
  }
  trim(str){
    if(str){
      return str.trim();
    }
    return '';
    
  }
  limpiarBuscador(){
		this.nandaBusqueda="";
		// this.offset = 0;
		this.cargarNanda();
	}
  cargarNanda() {
    var self = this;
    let r = this.hrzServerService.query({
      metodo        : "BuscCodigo_Nanda_movil",
      nandaBusqueda : this.nandaBusqueda,
      idform05      : this.idform05
    }, 'serverform05');
    r.subscribe(
      (s) => {
        
        if (s[0] != undefined) {
          this.nandas = s;
          console.log(this.nandas)
        } else {
          this.nandas = []
        }
      });
  }

}
