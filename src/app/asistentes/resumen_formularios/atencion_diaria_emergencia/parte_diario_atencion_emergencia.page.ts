import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-parte_diario_atencion_emergencia',
	templateUrl: './parte_diario_atencion_emergencia.page.html',
	styleUrls: ['./parte_diario_atencion_emergencia.page.scss'],
})
export class ParteDiarioAtencionEmergenciaPage implements OnInit {
	idatencion;
	parte_diario: any = {};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarParteDiarioAtencionEmergencia();
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
	
	cargarParteDiarioAtencionEmergencia(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosCUADRO_BASICO",
			idcuadro_basico: this.idatencion,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.parte_diario = s[0];
				console.log(this.parte_diario)
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