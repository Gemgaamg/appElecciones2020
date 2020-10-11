import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { AtencionesPorEspecialidadPage } from './atenciones_por_especialidad/atenciones_por_especialidad.page';

@Component({
	selector: 'app-historial_especialidad',
	templateUrl: './historial_especialidad.page.html',
	styleUrls: ['./historial_especialidad.page.scss'],
})
export class HistorialPorEspecialidad implements OnInit {
	idpaciente;
	carpetas = [];
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
			metodo: "actualizarlISTADO_x_espe",
			id_paciente: this.idpaciente,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.carpetas = (s);
				console.log(this.carpetas)
			});
	}

	
	async abrirAtenciones(carpeta) {
		console.log(carpeta)
		var self = this;
		const modal = await this.modalCtrl.create({
			component: AtencionesPorEspecialidadPage,
			componentProps: {
				idespecialidad: carpeta.idespex,
				idpaciente: this.idpaciente,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	

}