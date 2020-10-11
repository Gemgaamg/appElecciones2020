import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-resumen-receta',
	templateUrl: './receta.page.html',
	styleUrls: ['./receta.page.scss'],
})
export class ResumenRecetaPage implements OnInit {
	idreceta;
	receta: any = {};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarReceta();
	}

	dismiss() {
		this.modalCtrl.dismiss();
	}

	trim(str) {
		if (str) {
			return str.trim();
		}
		return '';

	}
	
	cargarReceta(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosRECETA",
			idreceta: this.idreceta,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.receta = s[0];
				console.log(this.receta)
			});
	}
	// voy a agregar datos del paciente en esta funcion de java ya que en la funcion actual sale mezclado
		// ASI
		//    |
		//  < - >
	// CARPETA: 160702 - CEDULA: 1309281952
	// CEDEÑO CARMEN MARIA ND, 72 Anos, MUJER
	// ------------------------------------
	// MEDICO: GOMEZ DELGADO ADELA
																			   
	// abrirAtencion(atencion){
	// 	if(atencion.depart_areax == 2){

	// 	}else if(atencion.depart_areax == 3){

	// 	}
	// }
}