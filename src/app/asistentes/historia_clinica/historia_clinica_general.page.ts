import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { HistorialCasosPage } from './historial_casos/historial_casos.page';
import { HistorialPorEspecialidad } from './historial_especialidades/historial_especialidad.page';
import { AntecedentesPage } from './antecedentes/antecedentes.page';


@Component({
	selector: 'app-historia_clinica',
	templateUrl: './historia_clinica_general.page.html',
	styleUrls: ['./historia_clinica_general.page.scss'],
})
export class HistoriaClinicaPage implements OnInit {
	idpaciente;
	info_paciente = {
		nombre: '',
		fecha_nacimiento: '',
		sexo: '',
		padre: '',
		madre: '',
		direccion: '',
		telefono: '',
		celular: '',
		
	};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		this.cargarPaciente();
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
	cargarPaciente() {
		var self = this;
		let r = this.hrzServerService.query({
			acc: "info_paciente",
			idpaciente: this.idpaciente,
		}, 'app_administracion');
		r.subscribe(
			(s) => {
				console.log(s)
				this.info_paciente = (s);
				console.log(this.info_paciente)
			});

	}


	async abrirHistorialAtencionDiaria() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: HistorialCasosPage,
			componentProps: {
				idpaciente : this.idpaciente,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		// console.log(data);
	}


	async abrirCarpetaPorEspecialidad() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: HistorialPorEspecialidad,
			componentProps: {
				idpaciente : this.idpaciente,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		// console.log(data);
	}


	async abrirAntecedentesPersonales() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: AntecedentesPage,
			componentProps: {
				idpaciente: this.idpaciente,
				tipo_antecedente:1,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}

	async abrirAntecedentesFamiliares() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: AntecedentesPage,
			componentProps: {
				idpaciente: this.idpaciente,
				tipo_antecedente:2,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		// console.log(data);
	}
	
}