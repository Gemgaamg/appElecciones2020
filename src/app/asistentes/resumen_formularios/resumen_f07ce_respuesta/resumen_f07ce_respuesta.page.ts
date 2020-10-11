import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-resumen_f07ce_respuesta',
	templateUrl: './resumen_f07ce_respuesta.page.html',
	styleUrls: ['./resumen_f07ce_respuesta.page.scss'],
})
export class ResumenF07CERespuestaPage implements OnInit {
	idform07;
	form07: any = {};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }
	ngOnInit() {
		this.cargarForm07();
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
	
	cargarForm07(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosRESPU_Interc",
			idf007: this.idform07,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.form07 = s[0];
				console.log(this.form07)
			});
	}
	
}