import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonContent, IonInfiniteScroll, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
	selector: 'app-cnttratemer',
	templateUrl: './cnttratemer.page.html',
	styleUrls: ['./cnttratemer.page.scss'],
})
export class CnttratemerPage implements OnInit {
	inp_paciente: string = '';
	interconsultas: any;
	interconsulta_seleccionada: any;
	// tiempo: Date;
	constructor(
		protected hrzServerService: HrzServerService, 
		public actionSheetController: ActionSheetController,
		public router : Router) { }
	@ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

	
	ngOnInit() {
		this.buscar();
	}
	ionViewWillEnter(){
		this.buscar();
	}	
	
	
	inp_paciente_change(){
		this.inp_paciente = this.inp_paciente.replace(/[^a-zA-Z0-9%]/gi,'');
	}
	buscar(){
		// console.log("este es el nuevo offset "+ this.offset)
		this.getMisSolicitudesInterconsultasAsignadas(undefined);
	}
	getMisSolicitudesInterconsultasAsignadas(event){
		var self = this;
		let r = this.hrzServerService.query({
			metodo:"getMisSolicitudesInterconsultasAsignadas",
			paciente:this.inp_paciente,
		},'serve_hospi_piso');
		r.subscribe(
		(interconsultas) => {
			if(event){
				event.target.complete();
			}
				this.interconsultas = interconsultas;

		});
	}
	limpiarBuscador(){
		this.inp_paciente="";
		// this.offset = 0;
		this.getMisSolicitudesInterconsultasAsignadas(undefined);
	}
	cargar10Mas(event){
		this.getMisSolicitudesInterconsultasAsignadas(event);
	}
	async abrirModalConfirmacion(interconsulta){
		this.interconsulta_seleccionada = interconsulta;
		const actionSheet = await this.actionSheetController.create({
			header: 'Accion',
			buttons: [{
			  text: 'Responder',
			//   role: 'destructive',
			  icon: 'send',
			  handler: () => {
				this.router.navigate(['/menu/cnttratemer/respuesta_interconsulta'],{
					queryParams: this.interconsulta_seleccionada,
					});
			  }
			}, {
			  text: 'Ver historial clinico',
			  icon: 'tablet-portrait',
			  handler: () => {
				console.log('Share clicked');
			  }
			},  {
			  text: 'Cancelar',
			  icon: 'close',
			  role: 'cancel',
			  handler: () => {
				console.log('Cancel clicked');
			  }
			}]
		  });
		  await actionSheet.present();
	}

  
}
