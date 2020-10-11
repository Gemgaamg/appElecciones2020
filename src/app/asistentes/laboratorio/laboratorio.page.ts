import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { Cie10Page } from '../cie10/cie10.page';

@Component({
	selector: 'app-laboratorio',
	templateUrl: './laboratorio.page.html',
	styleUrls: ['./laboratorio.page.scss'],
})
export class LaboratorioPage implements OnInit {
	cod4_sel = {};
	cie10s = [];
	cie10Busqueda = "";
	idsolicitud;
	change;
	confirmado;
	solicitud = {
		detalle: [],
		cod_4_1: null,
		cod_4_2: null,
		cod_4_3: null,
		observacion:'',
	};
	filtros = {
		arrAnalisis: [],
		codigo: "",
		nanalisis: ""
	};
	slideOpts: any = {
		allowTouchMove: false,
		// autoHeight: true
	};
	@ViewChild('puntos', { static: true }) puntos: IonSlides;

	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		console.log(this.idsolicitud)
		this.cargarSolicitud();
		// this.cargarCie10();
	}

	cerrar() {
		this.modalCtrl.dismiss();
	}
	enviar() {
		console.log("enviar", this.cod4_sel);
		this.modalCtrl.dismiss(this.cod4_sel);
	}
	trim(str) {
		if (str) {
			return str.trim();
		}
		return '';

	}
	limpiarBuscador() {
		this.filtros = {
			arrAnalisis: [],
			codigo: "",
			nanalisis: '',
		};
		this.buscarAnalisis(false);
	}

	eliminarDetalle(detalle) {

		let r = this.hrzServerService.query({
			metodo: "eliminarDetalleSolicitudBorrador",
			idsolicitud_detalle: detalle.idsolicitud_detalle,
		}, 'serverlaboratorio');
		r.subscribe(
			(r) => {
				if (r[0].estado == 'OK') {
					this.cargarSolicitud();
				} else {

					if (r[0].estado) {
						this.hrzServerService.abrirAdvertencia("Error", null, r[0].estado);
					} else {
						this.cargarSolicitud();
					}

				}

			});


	}
	buscarAnalisis(cambiarPunto1) {
		let r = this.hrzServerService.query({
			metodo: "getAnalisis",
			idpaciente: this.solicitud['idpaciente'] || '',
			nanalisis: this.filtros['nanalisis'] || '',
			codigo: this.filtros['codigo'] || '',
			idsolicitud: this.solicitud['idsolicitud'] || '',
			idestado: 1
		}, 'serverlaboratorio');
		r.subscribe(
			(r) => {
				// console.log(r)
				this.filtros['arrAnalisis'] = r;
				if (cambiarPunto1) {
					this.verListaAnalisisDisponibles();
				}

				// console.log(this.solicitud['detalle'].filter(a => a.idanalisis == 3455));
			});
	}
	esta_seleccionado(idanalisis) {
		return this.solicitud['detalle'].filter(a => a.idanalisis == idanalisis).length > 0;

	}
	addDetalle(analisis) {
		if (this.solicitud['detalle'].filter(a => a.idanalisis == analisis.idanalisis).length > 0) {
			return;
		}
		if (analisis.agotado === 0 || analisis.idestado === 2) {
			this.hrzServerService.abrirAdvertencia(null, null, analisis.motivo_bloqueo);
			return;
		}

		if (analisis.idestado === 3 || analisis.idestado === 4) {
			// this.dict_analisis_bloqueado = {
			// 		analisis_bloqueado: analisis,
			// 		motivo_add_analisis_bloqueado: '',
			// 	}  
			// this.$refs.modal_add_analisis_bloqueado.abrirModal();
			// return;
		}

		let r = this.hrzServerService.query({
			metodo: "addDetalleSolicitud",
			idsolicitud: this.idsolicitud,
			idanalisis: analisis.idanalisis
		}, 'serverlaboratorio');
		r.subscribe(
			(s) => {
				if (s[0].estado == 'OK') {
					this.cargarSolicitud();

				} else {
					if (s[0].estado) {
						// this.$refs.mensaje_error.abrirModal("Error",)
						this.hrzServerService.abrirAdvertencia("Error", null, s[0].estado);
					} else {
						this.cargarSolicitud();
					}

				}
			});



		//this.item_seleccionado = null;

	}
	quitarCIE10() {
		let r = this.hrzServerService.query({
			metodo: "quitarCIE10",
			idsolicitud: this.idsolicitud,
		}, 'serverlaboratorio');
		r.subscribe(
			(s) => {
				if (s[0].estado == 'OK') {
					this.cargarSolicitud();

				} else {
					if (s[0].estado) {
						// this.$refs.mensaje_error.abrirModal("Error",)
						this.hrzServerService.abrirAdvertencia("Error", null, s[0].estado);
					} else {
						this.cargarSolicitud();
					}

				}
			});


	}
	agregarCIE10(cod_4) {
		let r = this.hrzServerService.query({
			metodo: "agregarCIE10",
			idsolicitud: this.idsolicitud,
			cod_4: cod_4
		}, 'serverlaboratorio');
		r.subscribe(
			(s) => {
				if (s[0].estado == 'OK') {
					this.cargarSolicitud();

				} else {
					if (s[0].estado) {
						// this.$refs.mensaje_error.abrirModal("Error",)
						this.hrzServerService.abrirAdvertencia("Error", null, s[0].estado);
					} else {
						this.cargarSolicitud();
					}

				}
			});
	}
	async seleccionarCIE10() {
		const modal = await this.modalCtrl.create({
			component: Cie10Page,
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();

		if (data) {
			console.log(data)
			this.agregarCIE10(data.cod_4);
		}



	}

	cargarSolicitud() {
		console.log(this)
		if (this.change) {
			this.change();
		}

		var self = this;
		let r = this.hrzServerService.query({
			metodo: "getSolicitudInterna",
			idsolicitud: this.idsolicitud,
		}, 'serverlaboratorio');
		r.subscribe(
			(s) => {
				console.log(s)
				if (s[0] != undefined) {
					this.solicitud = s[0];
					this.buscarAnalisis(false)
				} else {
					this.solicitud = {
						detalle: [],
						cod_4_1: null,
						cod_4_2: null,
						cod_4_3: null,
						observacion:'',
					}
				}
			});
	}
	confirmarSolicitud() {
		if (this.confirmado) {
			this.confirmado();
		}
	}
	async agregarObservacion() {


		const alert = await this.alertController.create({
			// enableBackdropDismiss: false,
			backdropDismiss: false,
			header: 'Observacion',
			inputs: [
				{
					name: 'observacion',
					type: 'text',
					value: this.solicitud.observacion,
					placeholder: 'Describa las observaciones'
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
					text: 'Guardar',
					handler: async (d) => {
						console.log(d)

						let r = this.hrzServerService.query({
							metodo: "guardarObservacionSolucitud",
							observacion: d.observacion,
							idsolicitud: this.idsolicitud
						}, 'serverlaboratorio');
						r.subscribe(
							(r) => {
								if (r[0].estado == "OK") {
									this.cargarSolicitud()
								} else {
									if (r[0].estado) {
										this.hrzServerService.abrirAdvertencia(null, null, r[0].estado);
									}else{
										this.cargarSolicitud()
									}
									
								}
							});
					}
				}

			]
		});
		await alert.present();

	}
	punto = 0;
	verAnalisisSeleccionados() {

		this.puntos.slideTo(1);
		this.punto = 1;


	}
	verListaAnalisisDisponibles() {
		this.puntos.slideTo(0);
		this.punto = 0;
	}
}