import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonContent, IonInfiniteScroll, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
import { ResumenF07CESolicitudPage } from 'src/app/asistentes/resumen_formularios/resumen_f07ce_solicitud/resumen_f07ce_solicitud.page';
import { ThrowStmt } from '@angular/compiler';



@Component({
	selector: 'app-cnttriaje',
	templateUrl: './cnttriaje.page.html',
	styleUrls: ['./cnttriaje.page.scss'],
})
export class CnttriajePage implements OnInit {
	nombres: string = '';
	apellidos: string = '';
	cedula: string = '';
	numero_archivo: string = '';
	pacientes_emergencia: any;
	paciente_seleccionado: any;
	filtros = {
		referir:-1,
		cate:-1,
		categoria:'todos',
		texto:'Todos'
	}
	// tiempo: Date;
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
	}


	
	srcFiltrosPaciente(){
		let f = '';
		if(this.apellidos!== undefined && this.apellidos.trim()!==''){
			f = 'Apellidos: '+this.apellidos+'\t';
		}
		if(this.nombres!== undefined && this.nombres.trim()!==''){
			f = f+'Nombres: '+this.nombres+'\t';
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
					name: 'apellidos',
					type: 'text',
					placeholder: 'Apellidos',
					value: this.apellidos
				},
				{
					name: 'nombres',
					type: 'text',
					placeholder: 'Nombres',
					value: this.nombres
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
						this.nombres = '';
						this.apellidos = '';
						this.cedula = '';
						this.numero_archivo = '';
						this.getPacientesEmergencia(undefined);				
					}
				}, {
					text: 'Ok',
					handler: (data) => {
						this.nombres 		= data.nombres;
						this.apellidos 		= data.apellidos;
						this.cedula 		= data.cedula;
						this.numero_archivo = data.numero_archivo;
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
			metodo			: "getPacientesEmergencia",
			nombres			: this.nombres,
			apellidos		: this.apellidos,
			cedula			: this.cedula,
			numero_archivo	: this.numero_archivo,
			referir			: this.filtros.referir,
			cate			: this.filtros.cate,
		}, 'servetriaje');
		r.subscribe(
			(pacientes_emergencia) => {
				if (event) {
					event.target.complete();
				}
				this.pacientes_emergencia = pacientes_emergencia;

			});
	}
	limpiarBuscador() {
		this.nombres = "";
		this.apellidos = "";
		this.cedula = "";
		this.numero_archivo = "";
		this.getPacientesEmergencia(undefined);
	}
	cargar10Mas(event) {
		this.getPacientesEmergencia(event);
	}
	async abrirModalConfirmacion(pac) {
		this.paciente_seleccionado = pac;
		const actionSheet = await this.actionSheetController.create({
			header: 'Accion',
			buttons: [{
				text: 'Abrir parte diario',
				//   role: 'destructive',
				icon: 'send',
				handler: () => {
					this.router.navigate(['/menu/cnttriaje/parte_diario'],{
						queryParams: this.paciente_seleccionado,
						});
				}
			}, {
				text: 'Ver historial clinico',
				icon: 'tablet-portrait',
				handler: () => {
					this.verHistoriaClinica(this.paciente_seleccionado.idpaciente);
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
			inputs: [
				{
					name: 'todos',
					type: 'radio',
					label: 'Todos',
					value: {
						referir:-1,
						cate:-1,
						categoria:'todos',
						texto:'Todos'
					},
					checked: this.filtros.categoria=='todos'
				},
				{
					name: 'triaje',
					type: 'radio',
					label: 'Triaje Pediatrico',
					value: {
						referir:0,
						cate:1,
						categoria:'triaje',
						texto:'Triaje Pediatrico'
					},
					checked: this.filtros.categoria=='triaje'
				},
				{
					name: 'pediatria',
					type: 'radio',
					label: 'Pediatria',
					value: {
						referir:6,
						cate:1,
						categoria:'pediatria',
						texto:'Pediatria'
					},
					checked: this.filtros.categoria=='pediatria'
				},
				{
					name: 'observacion',
					type: 'radio',
					label: 'Observacion',
					value: {
						referir: 7,
						cate:-1,
						categoria:'observacion',
						texto:'Observacion'
					},
					checked: this.filtros.categoria=='observacion'
				},
				{
					name: 'ucim',
					type: 'radio',
					label: 'UCIM',
					value: {
						referir: 1,
						cate:-1,
						categoria:'ucim',
						texto:'UCIM'
					},
					checked: this.filtros.categoria=='ucim'
				},
				{
					name: 'shock',
					type: 'radio',
					label: 'SHOCK',
					value: {
						referir: 8,
						cate:-1,
						categoria:'shock',
						texto:'SHOCK'
					},
					checked: this.filtros.categoria=='shock'
				},
				{
					name: 'polivalente',
					type: 'radio',
					label: 'Polivalente',
					value: {
						referir:2,
						cate:-1,
						categoria:'polivalente',
						texto:'Polivalente'
					},
					checked: this.filtros.categoria=='polivalente'
				},
				{
					name: 'ginecologia',
					type: 'radio',
					label: 'Ginecologia',
					value: {
						referir:3,
						cate:-1,
						categoria:'ginecologia',
						texto:'Ginecologia'
					},
					checked: this.filtros.categoria=='ginecologia'
				},
				{
					name: 'cirugia',
					type: 'radio',
					label: 'Cirugia',
					value: {
						referir:4,
						cate:-1,
						categoria:'cirugia',
						texto:'Cirugia'
					},
					checked: this.filtros.categoria=='cirugia'
				},
				{
					name: 'observacion',
					type: 'radio',
					label: 'Observacion',
					value: {
						referir:5,
						cate:-1,
						categoria:'observacion',
						texto:'Observacion'
					},
					checked: this.filtros.categoria=='observacion'
				},
				{
					name: 'triaje_verde',
					type: 'radio',
					label: 'Triaje verde',
					value: {
						referir:0,
						cate:5,
						categoria:'triaje_verde',
						texto:'Triaje verde'
					},
					checked: this.filtros.categoria=='triaje_verde'
				},
				{
					name: 'triaje_azul',
					type: 'radio',
					label: 'Triaje azul',
					value: {
						referir:0,
						cate:6,
						categoria:'triaje_azul',
						texto:'Triaje azul'
					},
					checked: this.filtros.categoria=='triaje_azul'
				}
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
					text: 'Ok',
					handler: (data) => {
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

	

}
