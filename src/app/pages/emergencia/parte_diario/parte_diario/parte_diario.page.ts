import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonContent, IonInfiniteScroll, ActionSheetController, ModalController, IonSlides, IonButton, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertInput } from '@ionic/core';
// import { SolicitudInfoPage } from './solicitud-info/solicitud-info.page';
import { Location } from '@angular/common';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
import { ResumenSolicitudLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.page';
import { ResumenF05Page } from 'src/app/asistentes/resumen_formularios/resumen_f05/resumen_f05.page';
import { ResumenF08Page } from 'src/app/asistentes/resumen_formularios/resumen_f08/resumen_f08.page';
import { ParteDiarioAtencionEmergenciaPage } from 'src/app/asistentes/resumen_formularios/atencion_diaria_emergencia/parte_diario_atencion_emergencia.page';


@Component({
	selector: 'app-parte_diario',
	templateUrl: './parte_diario.page.html',
	styleUrls: ['./parte_diario.page.scss'],
})
export class ParteDiarioPage implements OnInit {
	deslizando = false;
	private cmbAreas: AlertInput[] = [];
	parte_diario_info = {
		id:null,
		// tcie1_respuesta:0,
		// tcie2_respuesta:0,
		// tcie3_respuesta:0,
		// tcie4_respuesta:0
	};
	historial_proceso: any = [{}];
	info_parte: any = {};
	evolucion_seleccionado: any;
	orden_puntos = {
		"info_parte": 0,
		"procesos": 1,
		// "t2": 1,
		// "t3": 2,
		
	};
	orden_puntos_inv = {
		0: "info_parte",
		1: "procesos",
		// 1: "t2",
		// 2: "t3",
		
	};
	idpre: number;
	slideOpts: any = {
		// allowTouchMove: false,
		autoHeight: true
	};
	tab_actual = 'info_parte';
	@ViewChild('puntos', { static: true }) puntos: IonSlides;
	constructor(
		protected hrzServerService: HrzServerService,
		// public actionSheetController: ActionSheetController,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		private modalCtrl: ModalController,
		public alertController: AlertController,
		public actionSheetController: ActionSheetController,
		private location: Location) {
		this.activatedRoute.queryParams.subscribe((res) => {
			console.log(res);
			this.idpre = res.idpre
		});
	}
	ionViewWillEnter(){
		this.getParteDiario();
		// this.ir_a('info_parte')
		this.actualizarInfoParte();
		this.actualizarProcesos();
	}
	ngOnInit() {
	}
	
	actualizarInfoParte(){
		let r = this.hrzServerService.query({
			metodo: "BuscarDatosTriageXIDPRE",
			idatencion: this.idpre,
		}, 'servetriaje');
		r.subscribe(
			(s) => {

				this.info_parte = s[0];

			});
	}
	actualizarProcesos(){
		let r = this.hrzServerService.query({
			metodo: "Form_Atencion_Emergencia",
			idatencion: this.idpre,
		}, 'servetriaje');
		r.subscribe(
			(s) => {

				this.historial_proceso = s;

			});
	}
	ir_a(t) {

		this.puntos.slideTo(this.orden_puntos[t]).then(s => {
			this.deslizando = false;
			this.tab_actual = t;
		});
	}
	ir_a_(t) {

		if (t == 'info_parte') {
			this.actualizarInfoParte();
		}else if (t == 'procesos') {
			this.actualizarProcesos();
		}else{
		}
	}
	slideChanged() {
		console.log("cambiado");

		this.puntos.getActiveIndex().then(index => {
			this.tab_actual = this.orden_puntos_inv[index];
			this.ir_a_(this.tab_actual);

			this.deslizando = false;
		});
	}
	getParteDiario() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "getParteDiario",
			idpre: this.idpre,
		}, 'servetriaje');
		r.subscribe(
			(s) => {
				if (s != "") {
					console.log(s)
					this.parte_diario_info = (s);
					var area = '';
					if (s.cate == 1 && s.referir == 0) {
						area = 'Triaje Pediatrico';
					}
					if (s.cate == 1 && s.referir == 6) {
						area = 'Pediatria';
					}
					if (s.referir == 7) {
						area = 'Triaje Observacion';
					}
					if (s.cate == 6 && s.referir == 0) {
						area = 'Triaje Azul';
					}
					if (s.cate == 5 && s.referir == 0) {
						area = 'Triaje verde';
					}
					if (s.referir == 1) {
						area = 'UCIM';
					}
					if (s.referir == 8) {
						area = 'SHOCK';
					}
					if (s.referir == 2) {
						area = 'Polivalente';
					}
					if (s.referir == 3) {
						area = 'Ginecologia';
					}
					if (s.referir == 4) {
						area = 'Cirugia';
					}
					if (s.referir == 5) {
						area = 'Observacion';
					}
					this.parte_diario_info['categoria'] = area;
					console.log(this.parte_diario_info);
				}

			});
	}
	abrirAlertCambiarArea() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "CategorizacionEmergencia",
			idatencion: this.idpre,
		}, 'servetriaje');
		r.subscribe(
			async (s) => {
				self.cmbAreas = [];
				s[0]['areas'].forEach(function (d) {
					self.cmbAreas.push(
						{
							name: 'idarea',
							type: 'radio',
							label: d["narea"] + "",
							value: d
						}
					);
				});

				const alert = await this.alertController.create({
					header: 'Categorizar paciente',
					mode: 'ios',
					inputs: this.cmbAreas,
					buttons: [
						{
							text: 'Cancelar',
							role: 'cancel',
							cssClass: 'secondary',
							handler: () => {
								console.log('Confirm Cancel');
							}
						}, {
							text: 'Ok',
							handler: (data) => {
								console.log(data)
								this.cambiarArea(data)

							}
						}
					]
				});
				await alert.present();


			});
	}
	cambiarArea(data) {
		let r = this.hrzServerService.query({
			metodo		: "EnviarPaciAEmergenciaDesdeTriage",
			idatencion	: this.idpre,
			idarea		: data.idarea,
			cate		: data.cate,
			referir		: data.referir
		}, 'servetriaje');
		r.subscribe(
			() => {
				this.actualizarInfoParte();
			});

	}
	async cambiarCama(){
		const alert = await this.alertController.create({
			// enableBackdropDismiss: false,
			backdropDismiss: false,
			header: 'Detalle de cama',
			inputs: [
				{
					name: 'cama',
					type: 'number',
					label: 'Cama',
					// value: '1',
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'Cambiar',
					handler: async (d) => {
						console.log(d)
						if(d.cama !==""){
							let r = this.hrzServerService.query({
								metodo: "cambiarCama",
								idpre: this.idpre,
								cama: d.cama,
							}, 'servetriaje');
							r.subscribe(
								(s) => {
									if(s.estado === 'OK'){
										this.actualizarInfoParte();
									}
					
								});
						}else{
							this.hrzServerService.abrirAdvertencia("Advertencia",null,"ESCRIBA UN NUMERO VALIDO");
						}
						
					}
				}

			]
		});
		await alert.present();
	}
	crearEvolucionForm05Matutina() {
		this.crearEvolucionForm05(1);
	}
	crearEvolucionForm05NotasEvolucion() {
		this.crearEvolucionForm05(2);
	}
	crearEvolucionForm05(idtipo_evol: Number) {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "crearEvolucionForm05",
			idpre: this.idpre,
			idtipo_evol: idtipo_evol,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				console.log(s)
				if (s.estado == 'OK') {
					console.log(s)
					s.idform05
					this.router.navigate(['/menu/cnttriaje/evolucion'],{
						queryParams: {idform05:s.idform05},
						});
				} else {
					this.hrzServerService.abrirAdvertencia("Advertencia",null,s.estado);
				}
			});
	}

	async abrirOpcionesEvolucion(e) {
		this.evolucion_seleccionado = e;
		console.log(e)
		if(e.tipoformx === 'FORM005' && e.estadox === 0){
			var parametros = {
				idform05 : this.evolucion_seleccionado.idformx
			}
			this.router.navigate(['/menu/cnttriaje/evolucion'],{
				queryParams: parametros,
			});
		}else{
			if(e.tipoformx === 'PDE'){
				this.abrirParteDiarioAtencionEmergencia(e.idformx);

			}else if(e.tipoformx === 'FORM053'){

			}else if(e.tipoformx === 'FORM007'){

			}else if(e.tipoformx === 'FORM010'){
				if(e.estadox == 1 || e.estadox == 7 || e.estadox == 10 || e.estadox == 11){
					this.abrirResumenSolicitudLaboratorio(e.idformx);
				}
				if(e.estadox == 2 || e.estadox == 3)
				{
					this.abrirResultadoLaboratorio(e.idformx);
				}  
			}else if(e.tipoformx === 'RECETA'){
				if(e.estadox!=0){
					this.abrirResumenReceta(e.idformx);
				}
			}else if(e.tipoformx === 'FORM08' || e.tipoformx === "FORM008"){
				this.abrirResumenF08(e.idformx);
			}else if(e.tipoformx === 'FORM005'){
				this.abrirResumenF05(e.idformx);
			}
				
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
	async verHistoriaClinica() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: HistoriaClinicaPage,
			componentProps: {
				idpaciente : this.parte_diario_info.id,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		console.log(data);
	}

}
