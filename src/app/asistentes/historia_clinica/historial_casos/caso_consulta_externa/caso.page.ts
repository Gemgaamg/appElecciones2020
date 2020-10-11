import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { FormulariosConsultaExternaPage } from './formularios_consulta_externa/formularios.page';

@Component({
	selector: 'app-caso_consulta_externa',
	templateUrl: './caso.page.html',
	styleUrls: ['./caso.page.scss'],
})
export class CasoConsultaExternaPage implements OnInit {
	idcaso;
	idatencion;

	historial = [];
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarCaso();
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

	cargarCaso() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "actualizarlISTADOCASo",
			idcaso: this.idcaso,
			idpre: this.idatencion,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.historial = s;
				console.log(this.historial)
			});
	}

	// abrirAtencion(atencion) {
	// 	if (atencion.depart_areax == 2) {
	// 		this.abrirAtencionEmergencia(atencion.idprex);
	// 	} else if (atencion.depart_areax == 3) {
	// 		this.abrirAtencionConsultaExterna(atencion.casox, atencion.idprex);
	// 	}
	// }
	async abrirAtencion(atencion) {
		console.log(atencion)
		var self = this;
		const modal = await this.modalCtrl.create({
			component: FormulariosConsultaExternaPage,
			componentProps: {
				idatencion: atencion.idprex,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	
}