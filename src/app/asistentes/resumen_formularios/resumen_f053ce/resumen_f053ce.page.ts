import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-resumen_f053ce',
	templateUrl: './resumen_f053ce.page.html',
	styleUrls: ['./resumen_f053ce.page.scss'],
})
export class ResumenF053CEPage implements OnInit {
	idform053;
	form053: any = {};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarForm053();
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
	
	cargarForm053(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosForm053",
			idf053: this.idform053,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.form053 = s[0];
				console.log(this.form053)
			});
	}
}