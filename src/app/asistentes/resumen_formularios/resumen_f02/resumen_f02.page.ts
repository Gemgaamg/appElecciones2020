import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-resumen_f02',
	templateUrl: './resumen_f02.page.html',
	styleUrls: ['./resumen_f02.page.scss'],
})
export class ResumenF02Page implements OnInit {
	idform02;
	form02: any = {};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarForm02();
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
	
	cargarForm02(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosForm002best",
			idf02: this.idform02,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.form02 = s[0];
				console.log(this.form02)
			});
	}
}