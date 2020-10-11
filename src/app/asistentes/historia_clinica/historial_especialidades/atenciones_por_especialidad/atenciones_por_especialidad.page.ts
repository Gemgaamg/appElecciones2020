import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ResumenF02Page } from 'src/app/asistentes/resumen_formularios/resumen_f02/resumen_f02.page';
import { ResumenF07CESolicitudPage } from 'src/app/asistentes/resumen_formularios/resumen_f07ce_solicitud/resumen_f07ce_solicitud.page';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';

import { ParteDiarioAtencionEmergenciaPage } from 'src/app/asistentes/resumen_formularios/atencion_diaria_emergencia/parte_diario_atencion_emergencia.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';

@Component({
	selector: 'app-atenciones_por_especialidad',
	templateUrl: './atenciones_por_especialidad.page.html',
	styleUrls: ['./atenciones_por_especialidad.page.scss'],
})
export class AtencionesPorEspecialidadPage implements OnInit {
	idpaciente;
	idespecialidad;
	formularios = [];
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarFormularios();
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

	cargarFormularios() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "actualizarlISTADO_OF_Espe",
			id_paciente: this.idpaciente,
			id_Espe: this.idespecialidad,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				this.formularios = (s);
				console.log(this.formularios)
			});
	}

	
	async abrirFormulario(formulario) {
		if(formulario.tipox.includes("FORM002, ANAMNESIS Y EXAMEN FISICO")){
			this.abrirResumen02(formulario.idformx)
		}else if(formulario.tipox.includes("FORM007")){
			this.abrirResumen07(formulario.idformx)
		}else if(formulario.tipox.includes("FORM010")){
			this.abrirResultadosLaboratorio(formulario.idformx)
		}else if(formulario.tipox.includes("RECETA")){
			this.abrirResumenReceta(formulario.idformx)
		}else if(formulario.tipox.includes("EMERGENCIA")){
			this.abrirResumenEmergencia(formulario.idformx)
		}
		console.log(formulario)
	}


	
	async abrirResumen02(idform02){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResumenF02Page,
			componentProps: {
				idform02 : idform02,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirResumen07(idform07){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResumenF07CESolicitudPage,
			componentProps: {
				idform07 : idform07,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirResultadosLaboratorio(idsolicitud){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResultadosLaboratorioPage,
			componentProps: {
				idsolicitud : idsolicitud,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirResumenReceta(idreceta){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResumenRecetaPage,
			componentProps: {
				idreceta : idreceta,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirResumenEmergencia(idatencion){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ParteDiarioAtencionEmergenciaPage,
			componentProps: {
				idatencion : idatencion,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}


}