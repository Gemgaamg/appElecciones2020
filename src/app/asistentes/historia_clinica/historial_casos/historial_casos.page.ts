import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { FormulariosAtencionEmergenciaPage } from './formularios_atencion_emergencia/formularios_atencion_emergencia.page';
import { CasoConsultaExternaPage } from './caso_consulta_externa/caso.page';

@Component({
	selector: 'app-historial_casos',
	templateUrl: './historial_casos.page.html',
	styleUrls: ['./historial_casos.page.scss'],
})
export class HistorialCasosPage implements OnInit {
	idpaciente;
	historial = [];
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarHistorialAtencionDiaria();
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

	cargarHistorialAtencionDiaria() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ActualizarListaCasoEstudiosAtencion",
			id_paciente: this.idpaciente,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.historial = (s);
				console.log(this.historial)
			});
	}

	abrirAtencion(atencion) {
		if (atencion.depart_areax == 2) {
			this.abrirAtencionEmergencia(atencion.idprex);
		} else if (atencion.depart_areax == 3) {
			this.abrirAtencionConsultaExterna(atencion.casox, atencion.idprex);
		}
	}
	async abrirAtencionEmergencia(idatencion) {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: FormulariosAtencionEmergenciaPage,
			componentProps: {
				idatencion: idatencion,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirAtencionConsultaExterna(idcaso, idatencion) {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: CasoConsultaExternaPage,
			componentProps: {
				idcaso: idcaso,
				idatencion: idatencion,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}

}