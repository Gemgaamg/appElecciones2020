import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-receta',
	templateUrl: './receta.page.html',
	styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
	ngOnInit(): void {
		this.cargarReceta();
	}
	idcomprobante;
	change;
	confirmado;
	medicamento_seleccionado: any;
	receta = {
		detalleCuadroBasico: [],
		detalleNoCuadroBasico: [],
		observacion: '',
	};
	filtros = {
		arrMedicamentoCB: [],
		arrMedicamentoNoCB: [],

		nmedicamento: ""
	};
	private cmbFrecuencia: AlertInput[] = [
		{ name: 'frecuencia6', type: 'radio', label: '4 HORAS' , value: "6"},
		{ name: 'frecuencia4', type: 'radio', label: '6 HORAS' , value: "4"},
		{ name: 'frecuencia3', type: 'radio', label: '8 HORAS' , value: "3"},
		{ name: 'frecuencia2', type: 'radio', label: '12 HORAS', value: "2"},
		{ name: 'frecuencia1', type: 'radio', label: '24 HORAS', value: "1"}
	];
	private cmbDosis: AlertInput[] = [];
	private cmbCantidad: AlertInput[] = [
		{ name: 'cantidad', type: 'number', placeholder: 'Cantidad' },
		{ name: 'uso', type: 'text', value: '', placeholder: 'Uso' }
	];
	opcionesMedicamento = {
		cmbFrecuencia: this.cmbFrecuencia,
		cmbDosis: this.cmbDosis,
		cmbCantidadUso: this.cmbCantidad
	}
	slideOpts: any = {
		allowTouchMove: false,
		initialSlide: 1,
    	speed: 400
		// autoHeight: true
	};
	@ViewChild('puntos', { static: false }) puntos: IonSlides;

	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }



	cerrar() {
		this.modalCtrl.dismiss();
	}
	cargarReceta() {
		if (this.change) {
			this.change();
		}
		this.actualizarCuadroBasico();
		this.actualizarNoCuadroBasico();
		this.actualizarNotasAdicionales();
		// setTimeout(
		// 	this.verAnalisisSeleccionados,5000
		// );
		this.verAnalisisSeleccionados();
		var self = this;

	}

	actualizarCuadroBasico() {
		let r = this.hrzServerService.query({
			metodo: "actualizarGridCB",
			idreceta: this.idcomprobante,
		}, 'serverform05');
		r.subscribe(
			(response) => {
				this.receta.detalleCuadroBasico = response;
			});

	}
	actualizarNoCuadroBasico() {
		let r = this.hrzServerService.query({
			metodo: "actualizarGridNoCB",
			idreceta: this.idcomprobante,
		}, 'serverform05');
		r.subscribe(
			(response) => {
				this.receta.detalleNoCuadroBasico = response;
			});
	}
	actualizarNotasAdicionales() {
		let r = this.hrzServerService.query({
			metodo: "actualizarNOtasAdicionales",
			idreceta: this.idcomprobante,
		}, 'serverform05');
		r.subscribe(
			(response) => {
				this.receta.observacion = response[0].observacion;
			});
	}

	trim(str) {
		if (str) {
			return str.trim();
		}
		return '';

	}

	buscarMedicamento() {
		let r = this.hrzServerService.query({
			metodo: "MedicamentosCBDisponiblesTOF005",
			idreceta: this.idcomprobante,
			nprod: this.filtros.nmedicamento || '',
		}, 'server_con_exter');
		r.subscribe(
			(r) => {
				this.filtros.arrMedicamentoCB = r;
				this.verListaMedicamentosDisponibles();
			});


		let r2 = this.hrzServerService.query({
			metodo: "MedicamentosNoCBDisponiblesTOF005",
			nprod: this.filtros.nmedicamento || '',
		}, 'server_con_exter');
		r2.subscribe(
			(r) => {
				console.log(r)
				this.filtros.arrMedicamentoNoCB = r;
				this.verListaMedicamentosDisponibles();
			});

	}
	async alert1(propiedad, inputs: AlertInput[], cb) {
		var alert = await this.alertController.create({
			header: propiedad,
			message: this.medicamento_seleccionado.nprod || this.medicamento_seleccionado.prodncb,
			backdropDismiss: false,
			inputs: inputs,
			cssClass:'upper',
			buttons: [
				{ text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => { } },
				{
					text: 'Ok',
					handler: (d) => {
						if (typeof d === 'string') {
							this.medicamento_seleccionado[propiedad] = d;
						} else {
							this.medicamento_seleccionado = Object.assign(d, this.medicamento_seleccionado);
						}

						cb();
					}
				}
			]
		});
		await alert.present();
	}
	addDetalleNoCB(medicamento) {
		this.medicamento_seleccionado = medicamento;
		this.alert1('Cantidad y Uso', this.opcionesMedicamento.cmbCantidadUso, () => {
			var m = this.medicamento_seleccionado;
			console.log(m)
			if (m.cantidad === null || m.cantidad.trim() === "" || m.cantidad === 0) {
				this.hrzServerService.abrirAdvertencia(null,
					'Advertencia',
					"Por favor escriba una cantidad valida",
					'alert-peligro');
				return;
			}

			if (m.uso === null || m.uso.trim() === '') {
				'-';
			}
			// this.hrzServerService.abrirAdvertencia(null,
			// 	m.prodncb,
			// 	m.uso,
			// 	null,
			// 	() => {
					this.ingresarMedicamentoNoCBAReceta();
				// }
			// );
		})
	}
	addDetalleCB(medicamento: any) {
		if (medicamento.estado === 0) {
			return;
		}
		this.medicamento_seleccionado = medicamento;
		// console.log(medicamento)
		this.obtenerDosisMaximaDelMedicamento(() => {
			this.obtenerDetallesAdicionalesMedicamento(() => {
				// console.log(medicamento);
				var esSolido = false;
				var llevaCombo = false;
				if (this.medicamento_seleccionado.esinsumox == 0) {
					if (this.medicamento_seleccionado.liquidosx == 0) {
						esSolido = true;
						if (this.medicamento_seleccionado.llevacombox != 0) {
							llevaCombo = true;
						}
					}
				}
				console.log("esSolido" + esSolido);
				console.log("llevaCombo" + llevaCombo);
				if (!esSolido) {
					this.alert1('Cantidad y Uso', this.opcionesMedicamento.cmbCantidadUso, () => {
						var m = this.medicamento_seleccionado;
						console.log(m)
						if (m.cantidad === null || m.cantidad.trim() === "" || m.cantidad === 0) {
							this.hrzServerService.abrirAdvertencia(null,
								'Advertencia',
								"Por favor escriba una cantidad valida",
								'alert-peligro');
							return;
						}
						if (m.cantidad > m.maxhospix) {
							this.hrzServerService.abrirAdvertencia(null,
								'Peligro',
								"El Medicamento - " + (m.nprod) + " - solo puede pedir un maximo de " + (m.maxhospix) + " cantidades(es)",
								'alert-peligro');
						} else {
							if (m.uso === null || m.uso.trim() === '') {

								m.uso = '-';
							}
							// this.hrzServerService.abrirAdvertencia(null,
							// 	m.nprod,
							// 	m.uso,
							// 	null,
							// 	() => {
									this.ingresarMedicamentoCBAReceta();
							// 	}
							// );
						}
					})
				} else {
					this.medicamento_seleccionado.Dosis = 1;
					if (llevaCombo) {
						this.obtenerCmbDosisDeMedicamento(() => {
							this.alert1("Dosis", this.opcionesMedicamento.cmbDosis, () => {
								this.alert1("Frecuencia", this.opcionesMedicamento.cmbFrecuencia, () => {
									var m = this.medicamento_seleccionado;
									m.cantidad = m.Frecuencia * m.Dosis;
									if (m.cantidad > 1) {
										m.uso = 'TOMAR ' + m.cantidad + ' MEDICAMENTOS DIARIO POR 1 DIA';
									} else {
										m.uso = 'TOMAR ' + m.cantidad + ' MEDICAMENTO DIARIO POR 1 DIA';
									}
									if (m.cantidad > m.maxhospix) {
										this.hrzServerService.abrirAdvertencia(null,
											'Peligro',
											"El Medicamento - " + (m.nprod) + " - solo puede pedir un maximo de " + (m.maxhospix) + " cantidades(es)",
											'alert-peligro');
									} else {
										// this.hrzServerService.abrirAdvertencia(null,
										// 	m.nprod,
										// 	m.uso,
										// 	null,
										// 	() => {
												this.ingresarMedicamentoCBAReceta();
										// 	}
										// );
									}



								})
							})
						})
					} else {
						this.alert1("Frecuencia", this.opcionesMedicamento.cmbFrecuencia, () => {
							var m = this.medicamento_seleccionado;
							m.cantidad = m.Frecuencia;
							if (m.cantidad > 1) {
								m.uso = 'TOMAR ' + m.cantidad + ' MEDICAMENTOS DIARIOS POR 1 DIA';
							} else {
								m.uso = 'TOMAR ' + m.cantidad + ' MEDICAMENTO DIARIO POR 1 DIA';
							}
							// this.hrzServerService.abrirAdvertencia(null,
							// 	m.nprod,
							// 	m.uso,
							// 	null,
							// 	() => {
									this.ingresarMedicamentoCBAReceta();
								// }
							// );

						})
					}
				}

				console.log("entro1")
				// await (await this.frecuencia(medicamento)).present();
				console.log("entro2")

			});
		});
		console.log("fin")

	}
	ingresarMedicamentoCBAReceta() {
		var m = this.medicamento_seleccionado;
		let r = this.hrzServerService.query({
			metodo: "ingresarMedicamentoCBAReceta",
			idreceta: this.idcomprobante,
			idbodprod: this.medicamento_seleccionado.idbodprod,
			cantidad: m.cantidad,
			dosis: m.dosis || 0,
			idfrec: m.Frecuencia || 0,
			duracion: 1,
			uso: m.uso,
		}, 'serveringbodega');
		r.subscribe(
			(r) => {
				this.hrzServerService.abrirMensaje(m.nprod, "Fue agregado correctamente");
				this.medicamento_seleccionado = null;
				this.cargarReceta();
			});
	}
	ingresarMedicamentoNoCBAReceta() {
		var m = this.medicamento_seleccionado;
		let r = this.hrzServerService.query({
			metodo: "ingresarMedicamentoNoCBAReceta",
			idreceta: this.idcomprobante,
			idpncb: m.idpncb,
			cantidad: m.cantidad,
			uso: m.uso,
		}, 'serveringbodega');
		r.subscribe(
			(r) => {
				this.hrzServerService.abrirMensaje(m.prodncb, "Fue agregado correctamente");
				this.medicamento_seleccionado = null;
				this.cargarReceta();
			});
	}
	async agregarNotaAdicional() {
		var alert = await this.alertController.create({
			header: "Nota Adicional",
			backdropDismiss: false,
			cssClass:'upper',
			inputs: [
				{ name: 'observacion', value:this.receta.observacion, type: 'text', placeholder: 'Cantidad' },
			],
			buttons: [
				{ text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => { } },
				{
					text: 'Ok',
					handler: (d) => {
						console.log(d)
						if(!d.observacion || d.observacion.trim() === ''){
							this.hrzServerService.abrirMensaje("Advertencia", "No se pudo agregar la observacion");
							return true;
						}
						let r = this.hrzServerService.query({
							metodo: "agregarNotaAdicional",
							idreceta: this.idcomprobante,
							observacion: d.observacion,
						}, 'serveringbodega');
						r.subscribe(
							(r) => {
								this.hrzServerService.abrirMensaje("", "Nota adicional ha sido modificada");
								this.cargarReceta();
							});
					}
				}
			]
		});
		await alert.present();

		
	}
	quitarMedicamentoCBReceta(iddetalle) {
		var m = this.medicamento_seleccionado;
		let r = this.hrzServerService.query({
			metodo: "quitarMedicamentoReceta",
			iddetalle: iddetalle,
		}, 'serveringbodega');
		r.subscribe(
			(r) => {
				this.actualizarCuadroBasico();
			});
	}
	quitarMedicamentoNoCBReceta(iddetalle) {
		var m = this.medicamento_seleccionado;
		let r = this.hrzServerService.query({
			metodo: "quitarMedicamentoReceta",
			iddetalle: iddetalle,
		}, 'serveringbodega');
		r.subscribe(
			(r) => {
				this.actualizarNoCuadroBasico();
			});
	}
	obtenerDosisMaximaDelMedicamento(cb) {
		let r = this.hrzServerService.query({
			metodo: "verDosisMaxima",
			idreceta: this.idcomprobante,
			idprod: this.medicamento_seleccionado.idbodprod,
		}, 'serveringbodega');
		r.subscribe(
			(r) => {
				if (r[0].estadox == 0) {
					this.hrzServerService.abrirAdvertencia(null,
						'Peligro',
						r[0].observacionx,
						'alert-peligro');
					this.medicamento_seleccionado = null;
				} else {
					if ((r[0].cant_max_diariax > 0) && (r[0].pasa_sin_notix == '1')) {
						this.hrzServerService.abrirAdvertencia(null,
							'Advertencia',
							r[0].observacionx,
							'alert-advertencia',
							() => {
								this.medicamento_seleccionado = Object.assign(r[0], this.medicamento_seleccionado);
								this.medicamento_seleccionado.maxhospix = r[0].cant_max_diariax;
								cb();
							});
					} else {
						this.medicamento_seleccionado = Object.assign(r[0], this.medicamento_seleccionado);
						cb();
					}
					// this.HabiObjetosRecetas();    

				}

			});
	}
	obtenerDetallesAdicionalesMedicamento(cb) {
		let r = this.hrzServerService.query({
			metodo: "HabiObjetosRecetas",
			idprodxbod: this.medicamento_seleccionado.idbodprod,
		}, 'serverform05');
		r.subscribe(
			(r) => {
				this.medicamento_seleccionado = Object.assign(r[0], this.medicamento_seleccionado);
				cb();
			});
	}
	obtenerCmbDosisDeMedicamento(cb) {
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ComboProdTieneDosis",
			idprod: this.medicamento_seleccionado.idprodx,
		}, 'serverform05');
		r.subscribe(
			(r) => {
				console.log(r);
				self.opcionesMedicamento.cmbDosis = [];
				r.forEach(function (d) {
					console.log(d);
					self.opcionesMedicamento.cmbDosis.push(
						{
							name: 'dosis',
							type: 'radio',
							label: d["valor"] + "",
							value: d["multiplo"] + ""
						}
					);
				});


				cb();
			});
	}


	confirmarSolicitud() {
		if (this.confirmado) {
			this.confirmado();
		}
	}

	punto = 1;
	verAnalisisSeleccionados() {
		// setTimeout(
			// ()=>{
				console.log(this);
				this.puntos.slideTo(1);
				this.punto = 1;
			// },5000
		// );
		


	}
	verListaMedicamentosDisponibles() {
		this.puntos.slideTo(0);
		this.punto = 0;
	}
}