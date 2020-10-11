import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-resumen_f05',
	templateUrl: './resumen_f05.page.html',
	styleUrls: ['./resumen_f05.page.scss'],
})
export class ResumenF05Page implements OnInit {
	idform05;
	form05: any = {};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarForm05();
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
	
	cargarForm05(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosForm05",
			idform05: this.idform05,
		}, 'serverform05');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.form05 = s[0];
				console.log(this.form05)
			});
	}
}