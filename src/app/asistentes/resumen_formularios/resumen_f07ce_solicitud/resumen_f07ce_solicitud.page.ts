import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ResumenF07CERespuestaPage } from '../resumen_f07ce_respuesta/resumen_f07ce_respuesta.page';
import { AtencionesPorEspecialidadPage } from '../../historia_clinica/historial_especialidades/atenciones_por_especialidad/atenciones_por_especialidad.page';

@Component({
	selector: 'app-resumen_f07ce_solicitud',
	templateUrl: './resumen_f07ce_solicitud.page.html',
	styleUrls: ['./resumen_f07ce_solicitud.page.scss'],
})
export class ResumenF07CESolicitudPage implements OnInit {
	idform07;
	form07: any = {
		idpaciente:null,
	};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		this.cargarForm07();
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
	
	cargarForm07(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosSoli_Interc",
			idf007: this.idform07,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.form07 = s[0];
				console.log(this.form07)
			});
	}
	
	async abrir07CERespuesta(){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResumenF07CERespuestaPage,
			componentProps: {
				idform07 : this.idform07,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}


	async abrirSolicitudesLaboratorios(){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: AtencionesPorEspecialidadPage,
			componentProps: {
				idespecialidad: 65,
				idpaciente: this.form07.idpaciente,
			}
		});
		await modal.present();

	}
}