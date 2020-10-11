import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-resumen_f08',
	templateUrl: './resumen_f08.page.html',
	styleUrls: ['./resumen_f08.page.scss'],
})
export class ResumenF08Page implements OnInit {
	idform08;
	form08: any = {};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarForm08();
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
	
	cargarForm08(){
		var self = this;
		let r = this.hrzServerService.query({
			metodo: "ObtenerDatosForm08",
			idform08: this.idform08,
		}, 'server_con_exter');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.form08 = s[0];
				console.log(this.form08)
			});
	}
}