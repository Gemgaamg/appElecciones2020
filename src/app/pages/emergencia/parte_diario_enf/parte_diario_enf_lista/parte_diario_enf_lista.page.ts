import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonInfiniteScroll, ActionSheetController, AlertController, ModalController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertInput } from '@ionic/core';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';




@Component({
	selector: 'app-parte_diario_enf_lista',
	templateUrl: './parte_diario_enf_lista.page.html',
	styleUrls: ['./parte_diario_enf_lista.page.scss'],
})
export class ParteDiarioEnfListaPage implements OnInit {
	primer_nombre: string = '';
	segundo_nombre: string = '';
	primer_apellido: string = '';
	segundo_apellido: string = '';
	cedula: string = '';
	numero_archivo: string = '';
	pacientes_emergencia: any;
	pacientes_emergencia_tareas: any;
	paciente_seleccionado: any;

	
	constructor(
		protected hrzServerService: HrzServerService,
		public actionSheetController: ActionSheetController,
		public router: Router,
		private modalCtrl: ModalController,
		public alertController: AlertController) { }
	@ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;


	ngOnInit() {
		this.buscar();
	}
	ionViewWillEnter() {
		this.buscar();
		this.obtenerAreas();
	}

	obtenerAreas(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "CargAreaToEvoluCMB",
		}, 'serverform05');
		r.subscribe(
			(r) => {
				self.cmbAreas = [];
				r.forEach(function (d) {
					console.log(d);
					self.cmbAreas.push(
						{
							name: 'idarea',
							type: 'radio',
							label: d["narea"] + "",
							value: {
								idarea : d["idarea"],
								texto : d["narea"],
							}
						}
					);
				});
			});
	}
	
	srcFiltrosPaciente(){
		let f = '';
		if(this.primer_apellido!== undefined && this.primer_apellido.trim()!==''){
			f = 'Apellidos: '+this.primer_apellido+' ';
			if(this.segundo_apellido!== undefined && this.segundo_apellido.trim()!==''){
				f = f+' '+this.segundo_apellido+' ';
			}
		}else{
			if(this.segundo_apellido!== undefined && this.segundo_apellido.trim()!==''){
				f = 'Apellidos: '+this.segundo_apellido+' ';
			}
		}

		if(this.primer_nombre!== undefined && this.primer_nombre.trim()!==''){
			f = f+'Nombre: '+this.primer_nombre+' ';
			if(this.segundo_nombre!== undefined && this.segundo_nombre.trim()!==''){
				f = f+' '+this.segundo_nombre+' ';
			}
		}else{
			if(this.segundo_nombre!== undefined && this.segundo_nombre.trim()!==''){
				f = f+'Nombre: '+this.segundo_nombre+' ';
			}
		}
		
		
		if(this.cedula!== undefined && this.cedula.trim()!==''){
			f = f+ 'Cedula: '+this.cedula+'\t';
		}
		if(this.numero_archivo!== undefined && this.numero_archivo.trim()!==''){
			f = f+ 'No. archivo: '+this.numero_archivo+'\t';
		}
		return f;
	}
	async abrirFiltros(){
		const alert = await this.alertController.create({
			
			header: 'Filtro de paciente',
			mode: 'ios',
			cssClass: 'upper scroll-y',
			inputs: [
				{
					name: 'primer_apellido',
					type: 'text',
					placeholder: 'Primer apellido',
					value: this.primer_apellido
				},
				{
					name: 'segundo_apellido',
					type: 'text',
					placeholder: 'Segundo apellido',
					value: this.segundo_apellido
				},
				{
					name: 'primer_nombre',
					type: 'text',
					placeholder: 'Primer nombre',
					value: this.primer_nombre
				},
				{
					name: 'segundo_nombre',
					type: 'text',
					placeholder: 'Segundo nombre',
					value: this.segundo_nombre
				},
				{
					name: 'cedula',
					type: 'text',
					placeholder: 'Cedula',
					value: this.cedula
				},
				{
					name: 'numero_archivo',
					type: 'number',
					placeholder: 'Numero de archivo',
					value: this.numero_archivo
				},
			],
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'btn-danger',
					handler: () => {
					}
				},{
					text: 'Limpiar',
					cssClass: 'btn-warning',
					handler: () => {
						this.primer_nombre = '';
						this.segundo_nombre = '';
						this.primer_apellido = '';
						this.segundo_apellido = '';
						this.cedula = '';
						this.numero_archivo = '';
						this.getPacientesEmergencia(undefined);				
					}
				}, {
					text: 'Ok',
					handler: (data) => {
						this.primer_nombre 		= data.primer_nombre;
						this.segundo_nombre		= data.segundo_nombre;
						this.primer_apellido	= data.primer_apellido;
						this.segundo_apellido	= data.segundo_apellido;
						this.cedula 			= data.cedula;
						this.numero_archivo 	= data.numero_archivo;
						this.getPacientesEmergencia(undefined);				
					}
				}
			]
		});

		await alert.present();
	}
	buscar() {
		this.getPacientesEmergencia(undefined);
	}
	getPacientesEmergencia(event) {
		var self = this;
		let r = this.hrzServerService.query({
			metodo			: "BusPacieNomToEvolEmergencia",
			archivo			: this.numero_archivo,
			cedula			: this.cedula,
			primer_apellido	: this.primer_apellido,
			segundo_apellido: this.segundo_apellido,
			primer_nombre	: this.primer_nombre,
			segundo_nombre	: this.segundo_nombre,
			idarea			: this.filtros.idarea,
		}, 'serverform05');
		r.subscribe(
			(pacientes_emergencia) => {
				if (event) {
					event.target.complete();
				}
				this.pacientes_emergencia = pacientes_emergencia;

			});
	}
	getPacientesEmergenciaPorTareas(event) {
		var self = this;
		let r = this.hrzServerService.query({
			metodo			: "BusPacieNomToEvolEmergenciaVistaKardex",
			archivo			: this.numero_archivo,
			cedula			: this.cedula,
			primer_apellido	: this.primer_apellido,
			segundo_apellido: this.segundo_apellido,
			primer_nombre	: this.primer_nombre,
			segundo_nombre	: this.segundo_nombre,
			idarea			: this.filtros.idarea,
		}, 'serverform05');
		r.subscribe(
			(pacientes_emergencia_tareas) => {
				if (event) {
					event.target.complete();
				}
				this.pacientes_emergencia_tareas = pacientes_emergencia_tareas;

			});
	}
	limpiarBuscador() {
		this.primer_nombre = "";
		this.segundo_nombre = "";
		this.primer_apellido = "";
		this.segundo_apellido = "";
		this.cedula = "";
		this.numero_archivo = "";
		this.getPacientesEmergencia(undefined);
	}
	cargar10Mas(event) {
		this.getPacientesEmergencia(event);
	}
	async abrirModalConfirmacion(pac) {
		this.paciente_seleccionado = pac;
		console.log(this.paciente_seleccionado)
		const actionSheet = await this.actionSheetController.create({
			header: 'Accion',
			buttons: [{
				text: 'Abrir parte diario',
				//   role: 'destructive',
				icon: 'send',
				handler: () => {
					this.router.navigate(['/menu/cntenferm/parte_diario_enf'],{
						queryParams: {idpre:this.paciente_seleccionado.idprex},
						});
				}
			}, {
				text: 'Ver historial clinico',
				icon: 'tablet-portrait',
				handler: () => {
					this.verHistoriaClinica(this.paciente_seleccionado.idx);
				}
			}, {
				text: 'Cancelar',
				icon: 'close',
				role: 'cancel',
				handler: () => {
				}
			}]
		});
		await actionSheet.present();
	}

	async abrirFiltroAreas() {
		const alert = await this.alertController.create({
			header: 'Filtro de búsqueda',
			subHeader: 'Areas Emergencia',
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
						console.log(data);
						this.filtros= data;
						this.limpiarBuscador();
					}
				}
			]
		});

		await alert.present();

	}

	async verHistoriaClinica(idpaciente) {
		var self = this;
		const modal = await this.modalCtrl.create({
			component: HistoriaClinicaPage,
			componentProps: {
				idpaciente : idpaciente,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		console.log(data);
	}

	







	deslizando = false;
	orden_puntos = {
		"pacientes": 0,
		"tareas": 1,
	};
	orden_puntos_inv = {
		0: "pacientes",
		1: "tareas",
	};
	slideOpts: any = {
		autoHeight: true
	};
	tab_actual = 'pacientes';
	private cmbAreas: AlertInput[] = [];
	filtros = {
		idarea:'-',
		texto:'Todos'
	}
	@ViewChild('puntos', { static: true }) puntos: IonSlides;

	ir_a(t) {

		this.puntos.slideTo(this.orden_puntos[t]).then(s => {
			this.deslizando = false;
			this.tab_actual = t;
		});
	}
	ir_a_(t) {

		if (t == 'pacientes') {
			this.getPacientesEmergencia(undefined);
		} else if (t == 'tareas') {
			this.getPacientesEmergenciaPorTareas(undefined);
		} else {
		}
	}
	slideChanged() {
		this.puntos.getActiveIndex().then(index => {
			this.tab_actual = this.orden_puntos_inv[index];
			this.ir_a_(this.tab_actual);

			this.deslizando = false;
		});
	}

}
