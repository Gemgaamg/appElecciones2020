import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-antecedentes',
	templateUrl: './antecedentes.page.html',
	styleUrls: ['./antecedentes.page.scss'],
})
export class AntecedentesPage implements OnInit {
	idpaciente;
	tipo_antecedente;
	ntipo_antecedente;
	antecedentes = [];
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarAntecedentes();
		if(this.tipo_antecedente === 1 ){
			this.ntipo_antecedente = 'PERSONALES';
		}else{
			this.ntipo_antecedente = 'FAMILIARES';
		}
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
	
	cargarAntecedentes(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "actualizarlISTADOAntecedentes",
			tipo_Ante: this.tipo_antecedente,
			id_paciente:this.idpaciente,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.antecedentes = (s);
				console.log(this.antecedentes)
			});
	}

	
	
}