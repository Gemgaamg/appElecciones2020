import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ModalController, IonSlides, AlertController, NavController, PickerController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NandaPage } from 'src/app/asistentes/nanda/nanda.page';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
import { SignosVitalesPage } from 'src/app/asistentes/signos_vitales/signos_vitales.page';
@Component({
	selector: 'app-evolucion_enf',
	templateUrl: './evolucion_enf.page.html',
	styleUrls: ['./evolucion_enf.page.scss'],
})
export class EvolucionEnfPage implements OnInit {
	//requerido
	guardado = false;
	deslizando = false;
	form05 = {
		idpre:null,
		cuadro_clinico: '',
		idsolicitud: null,
		idpaciente: null,
		idcomprobante: null,
		idestado: null,
		planes_tratamiento: [],
		lleva_soapie: null,
		soapie: {
			encabezado: null,
			soapie_s: null,
			soapie_o: null,
			soapie_a: null,
			soapie_a_otros: null,
			soapie_p: null,
			soapie_i: null,
			soapie_e: null,
		}
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
		private pickerController: PickerController) {
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

	guardar() {
		var self = this;
		if (this.form05.lleva_soapie === 0) {
			let r = this.hrzServerService.query({
				metodo: "guardarCuadroClinicoForm05",
				idform05: this.idform05,
				cuadro_clinico: this.form05['cuadro_clinico']
			}, 'serverform05');
			r.subscribe(
				(s) => {
					if (s == "OK") {
						this.guardado = true;
						this.cargarEvolucion()
					} else {

						this.hrzServerService.abrirAdvertencia(null, null, s);
						return;
					}

				});
		} else {
			let r = this.hrzServerService.query({
				metodo: "guardarSoapieForm05",
				idform05: this.idform05,
				encabezado: this.form05.soapie['encabezado'] || "",
				s: this.form05.soapie['soapie_s'] || "",
				o: this.form05.soapie['soapie_o'] || "",
				a: this.form05.soapie['soapie_a'] || "",
				a_otros: this.form05.soapie['soapie_a_otros'] || "",
				p: this.form05.soapie['soapie_p'] || "",
				i: this.form05.soapie['soapie_i'] || "",
				e: this.form05.soapie['soapie_e'] || "",
			}, 'serverform05');
			r.subscribe(
				(s) => {
					if (s.estado == "OK") {
						this.guardado = true;
						this.cargarEvolucion()
					} else {

						this.hrzServerService.abrirAdvertencia(null, null, s.estado);
						return;
					}

				});
		}
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
	terminarEvolucion(hora) {

		let r = this.hrzServerService.query({
			metodo	: "terminarEvolucion_sin_documento_electronico",
			idform05: this.idform05,
			hora    : hora,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				if (s.estado == "OK") {
					this.hrzServerService.abrirAdvertencia('Bien', null, 'Evolucion realizada con exito');
					this.navCtrl.back();
				} else {
					this.deslizando = false;
					this.hrzServerService.abrirAdvertencia(null, null, s.estado);
				}

			}
		);

	}

	validarSoapie() {
		var r = false;

		if (this.form05.soapie['encabezado'] !== null && (this.form05.soapie['encabezado']! || '').trim() !== '') {
			r = true;
		}
		if (this.form05.soapie['soapie_s'] !== null && (this.form05.soapie['soapie_s']! || '').trim() !== '') {
			r = true;
		}
		if (this.form05.soapie['soapie_o'] !== null && (this.form05.soapie['soapie_o']! || '').trim() !== '') {
			r = true;
		}
		if (this.form05.soapie['soapie_a'] !== null && (this.form05.soapie['soapie_a']! || '').trim() !== '') {
			r = true;
		}
		if (this.form05.soapie['soapie_a_otros'] !== null && (this.form05.soapie['soapie_a_otros']! || '').trim() !== '') {
			r = true;
		}
		if (this.form05.soapie['soapie_p'] !== null && (this.form05.soapie['soapie_p']! || '').trim() !== '') {
			r = true;
		}
		if (this.form05.soapie['soapie_i'] !== null && (this.form05.soapie['soapie_i']! || '').trim() !== '') {
			r = true;
		}
		if (this.form05.soapie['soapie_e'] !== null && (this.form05.soapie['soapie_e']! || '').trim() !== '') {
			r = true;
		}
		return r;
	}

	validarNotas() {
		var r = false;
		if (this.form05.cuadro_clinico != null && this.form05.cuadro_clinico.trim() !== '') {
			r = true;
		}
		return r;
	}
	controlBtnGuardar() {
		if (this.form05.idestado != 0) {
			return false;
		}
		if (this.guardado) {
			return false;
		}
		if (this.form05.lleva_soapie == 1) {
			return this.validarSoapie();
		} else {
			return this.validarNotas();
		}
	}
	controlBtnTerminarEvolucion() {
		var self = this;
		if (!self.guardado) {
			return false;
		}
		if (this.form05.lleva_soapie == 1) {
			return this.validarSoapie();
		} else {
			return this.validarNotas();
		}
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

	async abrirModalSignosVitales() {
		this.guardar();
		var self = this;
		const modal = await this.modalCtrl.create({
			component: SignosVitalesPage,
			componentProps: {
				solo_seleccionar:true,
				idpre: self.form05.idpre,
				// change: function () { self.cargarEvolucion() },
				confirmado: function (sv) { 
					var si = self.form05.soapie.soapie_o;
					if(si==null || si==undefined){
						si = '';
					}
					si = si + 
							"TA: "+sv.sistolica+"/"+sv.diastolica+", "+
							"TEMP: "+sv.temperatura+"°C, "+
							"F.CAR.: "+sv.fcardiaca+"xMin, "+
							"F.RES.: "+sv.frespiatoria+"xMin, "+
							"SAT.: "+sv.saturacion+"%, "+
							"TALLA.: "+sv.talla+"cm, "+
							"PESO.: "+sv.peso+"Klb";
					self.form05.soapie.soapie_o = si;
					self.guardar(); 
					modal.dismiss() }
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
	}
	async abrirModalAgregarNanda() {
		this.guardar();
		var self = this;
		const modal = await this.modalCtrl.create({
			component: NandaPage,
			componentProps: {
				idform05: this.idform05,
				change: function () { self.cargarEvolucion() },
				confirmado: function () { modal.dismiss() }
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		if (data.codigo) {
			this.agregarNanda(data);
		}
	}
	abrirModalQuitarNanda(){
		this.hrzServerService.abrirAdvertencia("Realmente desea quitar los diagnosticos",null,null,null,
		()=>{
			this.quitarNanda();
		},true);
	}
	quitarNanda(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "quitarNanda",
			idform05: this.idform05,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				this.cargarEvolucion();
			});

	}
	agregarNanda(nanda) {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "agregarNanda",
			codigo: nanda.codigo,
			idform05: this.idform05,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				console.log(s)
				if (s != "") {
					var msj = s.estado
					if (msj != "OK") {
						this.hrzServerService.abrirAdvertencia(null, null, msj);

					}
					else {
						self.cargarEvolucion();
					}
				}

			});

	}
	cambiar_notas() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "cambiarANotasEnf",
			idform05: this.idform05,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				console.log(s)
				if (s != "") {
					var msj = s.estado
					if (msj != "OK") {
						this.hrzServerService.abrirAdvertencia(null, null, msj);

					}
					else {
						self.cargarEvolucion();
					}
				}

			});
	}
	cambiar_soapie() {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "cambiarASoapieEnf",
			idform05: this.idform05,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				console.log(s)
				if (s != "") {
					var msj = s.estado
					if (msj != "OK") {
						this.hrzServerService.abrirAdvertencia(null, null, msj);

					}
					else {
						self.cargarEvolucion();
					}
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
	async verHistoriaClinica() {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: HistoriaClinicaPage,
			componentProps: {
				idpaciente: this.form05.idpaciente,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		// console.log(data);
	}
}
