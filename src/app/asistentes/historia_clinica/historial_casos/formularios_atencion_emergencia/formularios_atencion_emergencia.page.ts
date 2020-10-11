import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ParteDiarioAtencionEmergenciaPage } from 'src/app/asistentes/resumen_formularios/atencion_diaria_emergencia/parte_diario_atencion_emergencia.page';
import { ResumenF08Page } from 'src/app/asistentes/resumen_formularios/resumen_f08/resumen_f08.page';
import { ResumenF05Page } from 'src/app/asistentes/resumen_formularios/resumen_f05/resumen_f05.page';
import { ResumenSolicitudLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';

@Component({
	selector: 'app-formularios_atencion_emergencia',
	templateUrl: './formularios_atencion_emergencia.page.html',
	styleUrls: ['./formularios_atencion_emergencia.page.scss'],
})
export class FormulariosAtencionEmergenciaPage implements OnInit {
	idatencion;
	formularios = [];
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarFormulariosAtencionEmergencia();
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
	
	cargarFormulariosAtencionEmergencia(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosFormulariosEmerg",
			idatencion: this.idatencion,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.formularios = (s);
				console.log(this.formularios)
			});
	}

	abrirFormulario(formulario){
		if(formulario.tipoformx === 'ATENCION_BASICA'){
			this.abrirParteDiarioAtencionEmergencia(formulario.idformx);

		}else if(formulario.tipoformx === 'FORM053'){

		}else if(formulario.tipoformx === 'FORM007'){

		}else if(formulario.tipoformx === 'FORM010'){
			if(formulario.estadox == 1 || formulario.estadox == 7 || formulario.estadox == 10 || formulario.estadox == 11){
				this.abrirResumenSolicitudLaboratorio(formulario.idformx);
			}
			if(formulario.estadox == 2 || formulario.estadox == 3)
			{
				this.abrirResultadoLaboratorio(formulario.idformx);
			}  
		}else if(formulario.tipoformx === 'RECETA'){
			if(formulario.estadox!=0){
				this.abrirResumenReceta(formulario.idformx);
			}
		}else if(formulario.tipoformx === 'FORM08'){
			this.abrirResumenF08(formulario.idformx);
		}else if(formulario.tipoformx === 'FORM005'){
			this.abrirResumenF05(formulario.idformx);
		}
	}
	async abrirParteDiarioAtencionEmergencia(idatencion){
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
	async abrirResumenF08(idform08){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResumenF08Page,
			componentProps: {
				idform08 : idform08,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirResumenF05(idform05){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResumenF05Page,
			componentProps: {
				idform05 : idform05,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirResumenSolicitudLaboratorio(idsolicitud){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResumenSolicitudLaboratorioPage,
			componentProps: {
				idsolicitud : idsolicitud,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	
	async abrirResultadoLaboratorio(idsolicitud){
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
}