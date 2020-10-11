import { Component, OnInit, ViewChild, HostListener,  } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonContent, IonReorder, IonReorderGroup, IonInfiniteScroll, ActionSheetController, ModalController, IonSlides, IonButton, AlertController, NavController, PickerController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LaboratorioPage } from 'src/app/asistentes/laboratorio/laboratorio.page';
import { RecetaPage } from 'src/app/asistentes/receta/receta.page';
import { InfoDietaPage } from 'src/app/asistentes/info_dieta/info_dieta.page';
import { DietaPage } from 'src/app/asistentes/dieta/dieta.page';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
import { ItemReorderEventDetail } from '@ionic/core';
@Component({
	selector: 'app-evolucion',
	templateUrl: './evolucion.page.html',
	styleUrls: ['./evolucion.page.scss'],
})
export class EvolucionPage implements OnInit {


	deslizando = false;
	form05 = {
		idtipo_evol:null,
		cuadro_clinico: '',
		idsolicitud: null,
		idpaciente: null,
		idcomprobante: null,
		idestado: null,
		planes_tratamiento: [],
		
	};
	idform05: number;
	punto = 0;
	orden_puntos = {
		"0": 1,
		"1": 2,
	};
	@ViewChild('puntos', { static: true }) puntos: IonSlides;
	constructor(
		protected hrzServerService: HrzServerService,
		public alertController: AlertController,
		public activatedRoute: ActivatedRoute,
		private modalCtrl: ModalController,
		private navCtrl: NavController,
		private pickerController: PickerController,
		public actionSheetController: ActionSheetController) {
		this.activatedRoute.queryParams.subscribe((res) => {
			console.log(res);
			this.idform05 = res.idform05
		});
	}
	slideOpts: any = {
		allowTouchMove: false
	};
	
	ngOnInit() {
		this.cargarEvolucion();
	}
	slideChanged() {
		this.puntos.getActiveIndex().then(index => {
			this.punto = index;
			this.deslizando = false;
		});
	}

	
    async opcionesPlan(plan: any) {
		var b = [];
		
		if(plan.idtipo_servicio == 3){
			b.push(	{
						text: 'Ver informacion de la dieta',
						icon: 'heart',
						handler: () => {
							this.verDetalleDieta(plan.iddieta)
						}
					})
		};
		if((plan.idtipo_servicio == 0 || plan.idtipo_servicio == 3 || plan.idtipo_servicio == 4 || plan.idtipo_servicio == 5 || plan.idtipo_servicio == 6) && this.form05.idestado==0){
			b.push(	{
						text: 'Borrar',	role: 'destructive',
						icon: 'trash',
						handler: () => {
							this.quitarPlan(plan)
						}
					})
		}
		
		const actionSheet = await this.actionSheetController.create({
			header: 'Acciones',
			buttons: b,
		  });
		  await actionSheet.present();
	}
	reordenarPlan(event){
		console.log(this.form05.planes_tratamiento[event.detail.from].idform05_plan);
		console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
		event.detail.complete();

		var m = "bajarPlan";
		var n = event.detail.to - event.detail.from ;
		if(n<0){
			m = "subirPlan";
			n = -n;
		}
		let r = this.hrzServerService.query({
			metodo: m,
			idform05_plan: this.form05.planes_tratamiento[event.detail.from].idform05_plan,
			n : n
		}, 'serverform05');
		r.subscribe(
			(resp) => {
				if (resp.estado == "OK") {
					this.cargarEvolucion();
				} else {
					this.hrzServerService.abrirAdvertencia(null, null, resp.estado);
				}

			});	
	}
	siguiente() {
		this.deslizando = true;
		if (!this.btnSiguienteActivo()) {
			return;
		}
		
		if (this.orden_puntos[this.punto + ""] === 1) {
			
			if(this.form05['cuadro_clinico']===undefined){
				return;
			}
			let r = this.hrzServerService.query({
				metodo: "guardarCuadroClinicoForm05",
				idform05: this.idform05,
				cuadro_clinico: this.form05['cuadro_clinico']
			}, 'serverform05');
			r.subscribe(
				(s) => {
					if (s == "OK") {
						this.puntos.slideNext();
						this.cargarEvolucion()
					}else{
						this.deslizando = false;
						this.hrzServerService.abrirAdvertencia(null, null, s);
						return;
					}

				});

			
		}
		if (this.orden_puntos[this.punto + ""] === 2) {  // terminar evolucion
			if(this.form05.idtipo_evol == 1){
				this.abrirModalSeleccionarHoraParaTerminar();
			}else{
				this.terminarEvolucion('-');
			}
		}



	}

	terminarEvolucion(hora){
		let r = this.hrzServerService.query({
			metodo	: "terminarEvolucion",
			idform05: this.idform05,
			hora    : hora,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				if (s.estado == "OK") {
					this.hrzServerService.abrirAdvertencia('Bien', null, 'Evolucion realizada con exito');
					this.navCtrl.back();
				}else{
					this.deslizando = false;
					this.hrzServerService.abrirAdvertencia(null, null, s.estado);
				}

			});
	}
	async abrirModalSeleccionarHoraParaTerminar() {
		const picker = await this.pickerController.create({
			mode:'ios',
			columns: [
				{	
					name: 'hora',
					options: [
						{ text: 'Seleccione la hora', value: '-' },
						{ text: '00:00', value: '00' },
						{ text: '01:00', value: '01' },
						{ text: '02:00', value: '02' },
						{ text: '03:00', value: '03' },
						{ text: '04:00', value: '04' },
						{ text: '05:00', value: '05' },
						{ text: '06:00', value: '06' },
						{ text: '07:00', value: '07' },
						{ text: '08:00', value: '08' },
						{ text: '09:00', value: '09' },
						{ text: '10:00', value: '10' },
						{ text: '11:00', value: '11' },
						{ text: '12:00', value: '12' },
						{ text: '13:00', value: '13' },
						{ text: '14:00', value: '14' },
						{ text: '15:00', value: '15' },
						{ text: '16:00', value: '16' },
						{ text: '17:00', value: '17' },
						{ text: '18:00', value: '18' },
						{ text: '19:00', value: '19' },
						{ text: '20:00', value: '20' },
						{ text: '21:00', value: '21' },
						{ text: '22:00', value: '22' },
						{ text: '23:00', value: '23' },

					]
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel'
				},
				{
					text: 'Terminar',
					handler: (r) => {
						if(r.hora.value == '-'){
							this.hrzServerService.abrirAdvertencia('Advertencia', null, 'Seleccione una hora valida');
							return false;
						}
						this.terminarEvolucion(r.hora.value);
					}
				}
			]
		});

		await picker.present();
	}
	anterior() {
		this.deslizando = true;
		this.puntos.slidePrev();
	}

	btnSiguienteActivo() {
		if (this.orden_puntos[this.punto + ""] === 1) {
			return this.validarPunto1();
		}
		if (this.orden_puntos[this.punto + ""] === 2) {
			return this.validarPunto2();
		}

		return false;
	}
	btnAnteriorActivo() {
		if (this.punto == 0) {
			return false;
		}
		return true;
	}

	validarPunto1() {

		return true;
	}
	validarPunto2() {

		return true;
	}

	cargarEvolucion() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "obtenerForm05",
			idform05: this.idform05,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				if (s != "") {
					this.form05 = (s);
				}

			});
	}


	actualizarPlanTratamiento() {

		let r = this.hrzServerService.query({
			metodo: "actualizarPlanTratamiento",
			idform05: this.idform05,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				if (s != "") {
					this.form05 = (s);
				}

			});
	}

	quitarPlan(plan) {
		let r = this.hrzServerService.query({
			metodo: "quitarPlanTratamientoOtrosYDieta",
			idform05_plan: plan.idform05_plan,
		}, 'serverform05');
		r.subscribe(
			(resp) => {
				if (resp.estado == "OK") {
					this.cargarEvolucion();
				} else {
					this.hrzServerService.abrirAdvertencia(null, null, resp.estado);
				}

			});
	}
	async nuevoPlanTratamientoIndicaciones() {
		const alert = await this.alertController.create({
			// enableBackdropDismiss: false,
			backdropDismiss: false,
			header: 'Agregar Prescripciones e Indicaciones',
			inputs: [
				{
					name: 'descripcion_plan',
					type: 'text',
					placeholder: 'Descripcion de la prescripción'
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
					text: 'Agregar',
					handler: async (d) => {
						let r = this.hrzServerService.query({
							metodo: "agregarPlanTratamientoOtros",
							descripcion_plan: d.descripcion_plan,
							idform05: this.idform05
						}, 'serverform05');
						r.subscribe(
							(r) => {
								if (r.estado == "OK") {
									this.cargarEvolucion()
								} else {
									this.hrzServerService.abrirAdvertencia(null, null, r.estado);
								}
							});
					}
				}

			]
		});
		await alert.present();

	}
	async nuevoPlanTratamientoNovedades() {
		const alert = await this.alertController.create({
			// enableBackdropDismiss: false,
			backdropDismiss: false,
			header: 'Nueva Novedades',
			inputs: [
				{
					name: 'descripcion_plan',
					type: 'text',
					placeholder: 'Descripcion de la Novedad'
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
					text: 'Agregar',
					handler: async (d) => {
						let r = this.hrzServerService.query({
							metodo: "agregarPlanTratamientoOtros",
							descripcion_plan: d.descripcion_plan,
							idform05: this.idform05
						}, 'serverform05');
						r.subscribe(
							(r) => {
								if (r.estado == "OK") {
									this.cargarEvolucion()
								} else {
									this.hrzServerService.abrirAdvertencia(null, null, r.estado);
								}
							});
					}
				}

			]
		});
		await alert.present();

	}
	async controlSignosVitales() {
		const alert = await this.alertController.create({
			// enableBackdropDismiss: false,
			backdropDismiss: false,
			header: 'AGREGAR CONTROL DE SIGNOS VITALES',
			inputs: [
				{ name: 'frecuencia4' , type: 'radio', label: 'CADA 4 HORAS' , value: "1"},
				{ name: 'frecuencia6' , type: 'radio', label: 'CADA 6 HORAS' , value: "2"},
				{ name: 'frecuencia8' , type: 'radio', label: 'CADA 8 HORAS' , value: "3"},
				{ name: 'frecuencia12', type: 'radio', label: 'CADA 12 HORAS', value: "4"},
				{ name: 'frecuencia24', type: 'radio', label: 'CADA 24 HORAS', value: "5"},

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
					text: 'Agregar',
					handler: async (d) => {
						if(d === undefined){
							this.hrzServerService.abrirAdvertencia(null,
								'Advertencia',
								"Por favor escoja una frecuencia",
								'alert-peligro');
							return;
						}
						let r = this.hrzServerService.query({
							metodo: "agregarPlanTratamientoCSV",
							idcontrol_frecuencia: d,
							idform05: this.idform05
						}, 'serverform05');
						r.subscribe(
							(r) => {
								if (r.estado == "OK") {
									this.cargarEvolucion()
								} else {
									this.hrzServerService.abrirAdvertencia(null, null, r.estado);
								}
							});
					}
				}

			]
		});
		await alert.present();

	}
	async controlGlicemia() {
		const alert = await this.alertController.create({
			// enableBackdropDismiss: false,
			backdropDismiss: false,
			header: 'AGREGAR CONTROL DE GLICEMIA',
			inputs: [
				{ name: 'frecuencia4' , type: 'radio', label: 'CADA 4 HORAS' , value: "1"},
				{ name: 'frecuencia6' , type: 'radio', label: 'CADA 6 HORAS' , value: "2"},
				{ name: 'frecuencia8' , type: 'radio', label: 'CADA 8 HORAS' , value: "3"},
				{ name: 'frecuencia12', type: 'radio', label: 'CADA 12 HORAS', value: "4"},
				{ name: 'frecuencia24', type: 'radio', label: 'CADA 24 HORAS', value: "5"},

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
					text: 'Agregar',
					handler: async (d) => {
						if(d === undefined){
							this.hrzServerService.abrirAdvertencia(null,
								'Advertencia',
								"Por favor escoja una frecuencia",
								'alert-peligro');
							return;
						}
						let r = this.hrzServerService.query({
							metodo: "agregarPlanTratamientoGlicemia",
							idcontrol_frecuencia: d,
							idform05: this.idform05
						}, 'serverform05');
						r.subscribe(
							(r) => {
								if (r.estado == "OK") {
									this.cargarEvolucion()
								} else {
									this.hrzServerService.abrirAdvertencia(null, null, r.estado);
								}
							});
					}
				}

			]
		});
		await alert.present();

	}
	async abrirSolicitudLaboratorio() {
		var prioridad = 0;
		var sala = "";
		var cama = "";
		if (this.form05.idsolicitud) {
			this.abrirModalLaboratorio();
		} else {
			const alert = await this.alertController.create({
				// enableBackdropDismiss: false,
				backdropDismiss: false,
				header: 'Prioridad del examen',
				inputs: [
					{
						name: 'radio1',
						type: 'radio',
						label: 'Urgente',
						value: '1',
						checked: true
					},
					{
						name: 'radio1',
						type: 'radio',
						label: 'Rutina',
						value: '2',
					},
					{
						name: 'radio1',
						type: 'radio',
						label: 'Control',
						value: '3',
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
						text: 'Siguiente',
						handler: async (d) => {
							prioridad = d;
							this.crearSolicitudBorrador(prioridad);
						}
					}

				]
			});
			await alert.present();
		}
	}

	async abrirReceta() {
		if (this.form05.idcomprobante) {
			this.abrirModalReceta();
		} else {
			this.crearRecetaBorrador();
		}
	}


	crearRecetaBorrador(){
		// $.post('serverform05', 
		// {                        
		// idform05 : IDFORM05,
		// metodo : 'RecetaNuevaEnEvolu'       
		// }, function(response) 
		// {                          
		// 	self.Datos_Receta = response[0];                                          
		// 	if (self.Datos_Receta.estadox2==7)
		// 		{
		// 			// appVueGeneral.$refs.resumen_general.abrirModal('EL PACIENTE POSEE UNA RECETA IMCOMPLETA Y NO SE PUEDE REALIZAR OTRA',0);
		// 			this.hrzServerService.abrirAdvertencia(null, null, "El paciente posee una receta incompleta y no se puede realizar otra.");
		// 		}
		// 	else{
		// 		if (self.Datos_Receta.idcomprobantex2!=0){
		// 			self.form05.idcomprobante=self.Datos_Receta.idcomprobantex2;
		// 			appVueGeneral.$refs.receta_electronica_form005.abrirModal(self.Datos_Receta.idcomprobantex2, self.actualizarPlanTratamiento);
		// 		}                                                
		// 		}
		// });
		
		
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "RecetaNuevaEnEvolu",
			idform05: this.idform05
		}, 'serverform05');
		r.subscribe(
			(r) => {
				var d = r[0];
				if (d.estadox2 == 7) {
					this.hrzServerService.abrirAdvertencia(null, null, "El paciente posee una receta incompleta y no se puede realizar otra.");
					
				} else if (d.idcomprobantex2 != 0) {
					this.hrzServerService.abrirAdvertencia(null, null, "debe abrir receta "+d.idcomprobantex2);
					this.form05.idcomprobante = d.idcomprobantex2;
					this.abrirModalReceta();
					this.cargarEvolucion()
				}
			});

	}
	crearSolicitudBorrador(prioridad) {

		var self = this;
		let r = this.hrzServerService.query({
			metodo: "crearSolicitudLaboratorio",
			prioridad: prioridad,
			sala: 'cama',
			cama: 'sala',
			idform05: this.idform05
		}, 'serverform05');
		r.subscribe(
			(r) => {
				if (r[0].estado == "OK") {
					this.form05.idsolicitud = r[0].idsolicitud;
					this.abrirModalLaboratorio();
					this.cargarEvolucion()
				} else if (r[0].estado == 'SOLICITUD_PENDIENTE') {
					this.hrzServerService.abrirAdvertencia(null, null, "Este paciente ya tiene una solicitud creada por usted en estado pendiente.");

				} else {
					this.hrzServerService.abrirAdvertencia(null, null, r[0].estado);
				}
			});




	}

	async verDetalleDieta(iddieta) {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: InfoDietaPage,
			componentProps: {
				iddieta: iddieta,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		console.log(data);
	}

	async verHistoriaClinica() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: HistoriaClinicaPage,
			componentProps: {
				idpaciente : this.form05.idpaciente,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		// console.log(data);
	}

	async abrirModalLaboratorio() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: LaboratorioPage,
			componentProps: {
				idsolicitud: this.form05.idsolicitud,
				change: function () { self.actualizarPlanTratamiento() },
				confirmado: function () { modal.dismiss() }
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		console.log(data);


	}


	async abrirModalReceta() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: RecetaPage,
			backdropDismiss:false,
			componentProps: {
				idcomprobante: this.form05.idcomprobante,
				change: function () { self.actualizarPlanTratamiento() },
				confirmado: function () { modal.dismiss() }
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		console.log(data);


	}


	async abrirModalDieta() {
		const modal = await this.modalCtrl.create({
			component: DietaPage,
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();

		if (data) {
			let dietadata = data;
			const alert = await this.alertController.create({
				// enableBackdropDismiss: false,
				backdropDismiss: false,
				header: 'Seleccione tipo de dieta',
				inputs: [
					{
						name: 'radio1',
						type: 'radio',
						label: 'Desayuno',
						value: '1',
						checked: true
					},
					{
						name: 'radio1',
						type: 'radio',
						label: 'Almuerzo',
						value: '2',
					},
					{
						name: 'radio1',
						type: 'radio',
						label: 'Merienda',
						value: '3',
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
						text: 'Siguiente',
						handler: async (d) => {
							dietadata.idtipo_comida = d;
							const alert2 = await this.alertController.create({
								// enableBackdropDismiss: false,
								backdropDismiss: false,
								header: 'Observacion (opcional)',
								inputs: [
									{
										name: 'observacion',
										type: 'text',
										checked: true
									},
								],
								buttons: [
									{
										text: 'Cancelar',
										role: 'cancel',
										cssClass: 'secondary',
										handler: () => {
										}
									}, {
										text: 'Siguiente',
										handler: async (d) => {
											dietadata.observacion = d.observacion;
											this.agregarDieta(dietadata);
										}
									}
				
								]
							});
							
							await alert2.present();
						}
					}

				]
			});
			
			await alert.present();
		}
	}
	agregarDieta(dieta) {
		let r = this.hrzServerService.query({
			metodo: "agregarPlanTratamientoDieta",
			iddieta: dieta.iddieta,
			idform05: this.idform05,
			idtipo_comida: dieta.idtipo_comida,
			observacion_dieta: dieta.observacion,
		}, 'serverform05');
		r.subscribe(
			(r) => {
				if (r.estado == "OK") {
					this.cargarEvolucion();
				} else {
					this.hrzServerService.abrirAdvertencia(null, null, r.estado);
				}

			});
	}

	async anularEvolucion() {
		const alert = await this.alertController.create({
			header: '¿Esta seguro de anular la evolucion?',
			message: 'Al eliminar la evolucion se eliminaran los examenes de laboratorio y recetas hechas en esta evolucion',
			buttons: [
				{
					text: 'Cancelar'
				}
				, {
					text: 'Aceptar',
					handler: () => {
						let r = this.hrzServerService.query({
							metodo: "anular05",
							idform05: this.idform05,
						}, 'serverform05');
						r.subscribe(
							(r) => {
								if (r.estado == "OK") {
									this.navCtrl.back();
								} else {
									this.hrzServerService.abrirAdvertencia(null, null, r.estado);
								}

							});
					}
				}]
		});

		await alert.present();
	}
}
