import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonContent, IonInfiniteScroll, ActionSheetController, ModalController, IonSlides, IonButton } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SolicitudInfoPage } from './solicitud-info/solicitud-info.page';
import { Cie10Page } from 'src/app/asistentes/cie10/cie10.page';
import { Location } from '@angular/common';


@Component({
	selector: 'app-respuesta_interconsulta',
	templateUrl: './respuesta_interconsulta.page.html',
	styleUrls: ['./respuesta_interconsulta.page.scss'],
})
export class RespuestaInterconsultaPage implements OnInit {

	form07 = {
		cuadrointer: '',
		resucriterio: '',
		plandiag:'',
		plantrata:'',
		
		cod_4_respuesta : '0',
		tcie1_respuesta : '0',
		cod_4_2_respuesta : '0',
		tcie2_respuesta : '0',
		cod_4_3_respuesta : '0',
		tcie3_respuesta : '0',
		cod_4_4_respuesta : '0',
		tcie4_respuesta : '0',
		
	};
	idform07: number;
	punto = 0;
	orden_puntos = {
		"0": 6,
		"1": 7,
		"2": 8,
		"3": 9,
		"4": 10,
	};
	@ViewChild('puntos', { static: true }) puntos: IonSlides;
	constructor(
		protected hrzServerService: HrzServerService,
		// public actionSheetController: ActionSheetController,
		public activatedRoute: ActivatedRoute,
		private modalCtrl: ModalController,
		private location: Location) {
		this.activatedRoute.queryParams.subscribe((res) => {
			console.log(res);
			this.idform07 = res.idform07
		});
	}
	slideOpts: any = {
		allowTouchMove: false
	};

	ngOnInit() {
		this.cargarSolicitudInterconsulta();
	}
	slideChanged() {

		this.puntos.getActiveIndex().then(index => {
			this.punto = index;
			this.deslizando = false;
		});
	}
	deslizando = false;
	siguiente() {
		this.deslizando = true;
		if (!this.btnSiguienteActivo()) {
			return;
		}
		if (this.orden_puntos[this.punto + ""] === 6) {
			let r = this.hrzServerService.query({
				metodo: "guardar_punto_6",
				idform07: this.idform07,
				cuadrointer: this.form07['cuadrointer']
			}, 'serverform07');
			r.subscribe(
				(s) => {
					if (s == "OK") {
						this.puntos.slideNext();
						this.cargarSolicitudInterconsulta()
					}

				});
		}

		if (this.orden_puntos[this.punto + ""] === 7) {

			let r = this.hrzServerService.query({
				metodo: "guardar_punto_7",
				idform07: this.idform07,
				resucriterio: this.form07['resucriterio']
			}, 'serverform07');
			r.subscribe(
				(s) => {
					if (s == "OK") {
						this.puntos.slideNext();
						this.cargarSolicitudInterconsulta()
					}

				});
		}
		if (this.orden_puntos[this.punto + ""] === 8) {
			let r = this.hrzServerService.query({
				metodo: "guardar_punto_8",
				idform07: this.idform07,
				cod_4_respuesta: this.form07['cod_4_respuesta'] ? this.form07['cod_4_respuesta'] : '0',
				tcie1_respuesta: this.form07['tcie1_respuesta'] ? this.form07['tcie1_respuesta'] : '0',
				cod_4_2_respuesta: this.form07['cod_4_2_respuesta'] ? this.form07['cod_4_2_respuesta'] : '0',
				tcie2_respuesta: this.form07['tcie2_respuesta'] ? this.form07['tcie2_respuesta'] : '0',
				cod_4_3_respuesta: this.form07['cod_4_3_respuesta'] ? this.form07['cod_4_3_respuesta'] : '0',
				tcie3_respuesta: this.form07['tcie3_respuesta'] ? this.form07['tcie3_respuesta'] : '0',
				cod_4_4_respuesta: this.form07['cod_4_4_respuesta'] ? this.form07['cod_4_4_respuesta'] : '0',
				tcie4_respuesta: this.form07['tcie4_respuesta'] ? this.form07['tcie4_respuesta'] : '0',
			}, 'serverform07');
			r.subscribe(
				(s) => {
					if (s == "OK") {
						this.puntos.slideNext();
						this.cargarSolicitudInterconsulta()
					}
				});
		}
		if (this.orden_puntos[this.punto + ""] === 9) {
			let r = this.hrzServerService.query({
				metodo: "guardar_punto_9",
				idform07: this.idform07,
				plandiag: this.form07['plandiag']
			}, 'serverform07');
			r.subscribe(
				(s) => {
					if (s == "OK") {
						this.puntos.slideNext();
						this.cargarSolicitudInterconsulta()
					}

				});
		}
		if (this.orden_puntos[this.punto + ""] === 10) {
			// this.hrzServerService.abrirLoading();
			let r = this.hrzServerService.query({
				metodo: "guardar_punto_10",
				idform07: this.idform07,
				plantrata: this.form07['plantrata']
			}, 'serverform07');

			r.subscribe(
				(s) => {
					console.log(s)
					if (s == "OK") {

						if ((this.validarPunto6() && this.validarPunto7() && this.validarPunto8() && this.validarPunto9() && this.validarPunto10())) {
							let r = this.hrzServerService.query({
								metodo: "responder_interconsulta",
								idform07: this.idform07,
							}, 'serverform07');

							r.subscribe(
								(s) => {
									var msj = s.estado
									console.log(s)
									if (msj != "OK") {
										console.log(s)
										// this.hrzServerService.cerrarLoading();
										this.hrzServerService.abrirAdvertencia('Error', 'No se pudo responder la interconsulta', msj);
									}
									else {
										if (s.iddocumento) {
											// this.hrzServerService.cerrarLoading();
											this.hrzServerService.abrirAdvertencia('Bien', null, 'La interconsulta fue respondida con exito');
											this.location.back();
										}
									}

								});
						}


					} else {
						this.hrzServerService.cerrarLoading();
						this.hrzServerService.abrirAdvertencia('Error', null, 'No se pudo responder la interconsulta');
					}

				});
		}

	}
	anterior() {
		this.deslizando = true;
		this.puntos.slidePrev();
	}

	btnSiguienteActivo() {
		if (this.orden_puntos[this.punto + ""] === 6) {
			return this.validarPunto6();
		}
		if (this.orden_puntos[this.punto + ""] === 7) {
			return this.validarPunto7();
		}
		if (this.orden_puntos[this.punto + ""] === 8) {
			return this.validarPunto8();
		}
		if (this.orden_puntos[this.punto + ""] === 9) {
			return this.validarPunto9();
		}
		if (this.orden_puntos[this.punto + ""] === 10) {
			return this.validarPunto10();
		}
		return false;
	}
	btnAnteriorActivo() {
		if (this.punto == 0) {
			return false;
		}
		return true;
	}

	validarPunto6() {
		if (this.form07['cuadrointer']) {
			if (this.form07['cuadrointer'].trim() !== '') {
				return true;
			}
		}
		return false;
	}
	validarPunto7() {
		if (this.form07['resucriterio']) {
			if (this.form07['resucriterio'].trim() !== '') {
				return true;
			}
		}
		return false;
	}
	validarPunto8() {
		// if(this.form07['resucriterio']){
		// 	if(this.form07['resucriterio'].trim() !== ''){
		return true;
		// }
		// }
		// return false;
	}
	validarPunto9() {
		if (this.form07['plandiag']) {
			if (this.form07['plandiag'].trim() !== '') {
				return true;
			}
		}
		return false;
	}
	validarPunto10() {
		if (this.form07['plantrata']) {
			if (this.form07['plantrata'].trim() !== '') {
				return true;
			}
		}
		return false;
	}
	quitarCie10(i) {
		if (i == 1) {
			this.form07['tcie1_respuesta'] = '0';
			this.form07['cod_4_respuesta'] = undefined;
			return;
		}
		if (i == 2) {
			this.form07['tcie2_respuesta'] = '0';
			this.form07['cod_4_2_respuesta'] = undefined;
			return;
		}
		if (i == 3) {
			this.form07['tcie3_respuesta'] = '0';
			this.form07['cod_4_3_respuesta'] = undefined;
			return;
		}
		if (i == 4) {
			this.form07['tcie4_respuesta'] = '0';
			this.form07['cod_4_4_respuesta'] = undefined;
			return;
		}
	}
	cargarSolicitudInterconsulta() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "obtenerInterconsulta",
			idform07: this.idform07,
		}, 'serverform07');
		r.subscribe(
			(s) => {
				if (s != "") {
					console.log(s)
					this.form07 = (s);
					if (!this.form07['cod_4_respuesta'] || this.form07['cod_4_respuesta'] == '0') {
						this.form07['tcie1_respuesta'] = '0';
						this.form07['cod_4_respuesta'] = undefined;
					}
					if (!this.form07['cod_4_2_respuesta'] || this.form07['cod_4_2_respuesta'] == '0') {
						this.form07['tcie2_respuesta'] = '0';
						this.form07['cod_4_2_respuesta'] = undefined;
					}
					if (!this.form07['cod_4_3_respuesta'] || this.form07['cod_4_3_respuesta'] == '0') {
						this.form07['tcie3_respuesta'] = '0';
						this.form07['cod_4_3_respuesta'] = undefined;
					}
					if (!this.form07['cod_4_4_respuesta'] || this.form07['cod_4_4_respuesta'] == '0') {
						this.form07['tcie4_respuesta'] = '0';
						this.form07['cod_4_4_respuesta'] = undefined;
					}
				}

			});
	}
	async abrirModalSolicitudInfo() {
		const modal = await this.modalCtrl.create({
			component: SolicitudInfoPage,
			componentProps: {
				idform07: this.idform07,
			}
		});
		await modal.present();
	}



	async abrirModalCie10(modelo) {
		const modal = await this.modalCtrl.create({
			component: Cie10Page,
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		if (data) {
			this.form07[modelo] = data.cod_4;
		}

	}
}
