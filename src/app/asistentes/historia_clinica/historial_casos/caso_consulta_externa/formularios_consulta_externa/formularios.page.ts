import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
import { ResumenSolicitudLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.page';
import { ResumenF02Page } from 'src/app/asistentes/resumen_formularios/resumen_f02/resumen_f02.page';
import { ResumenF053CEPage } from 'src/app/asistentes/resumen_formularios/resumen_f053ce/resumen_f053ce.page';
import { ResumenF07CESolicitudPage } from 'src/app/asistentes/resumen_formularios/resumen_f07ce_solicitud/resumen_f07ce_solicitud.page';

@Component({
	selector: 'app-formularios_consulta_externa',
	templateUrl: './formularios.page.html',
	styleUrls: ['./formularios.page.scss'],
})
export class FormulariosConsultaExternaPage implements OnInit {
	idatencion;
	formularios = [];
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarFormulariosCe();
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
	
	cargarFormulariosCe(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosFormulariosCE",
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
		console.log(formulario)
		if(formulario.tipoformx === 'FORM002'){
			this.abrirResumenF02(formulario.idformx);

		}else if(formulario.tipoformx === 'FORM053'){
			this.abrirResumenF053CE(formulario.idformx);

		}else if(formulario.tipoformx === 'FORM007'){
			this.abrirResumenF07CESolicitud(formulario.idformx);
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
		}
	}
	async abrirResumenF053CE(idform053){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: ResumenF053CEPage,
			componentProps: {
				idform053 : idform053,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirResumenF07CESolicitud(idform07){
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
	async abrirResumenF02(idform02){
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