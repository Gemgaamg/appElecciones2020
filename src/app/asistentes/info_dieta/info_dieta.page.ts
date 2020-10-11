import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-info_dieta',
	templateUrl: './info_dieta.page.html',
	styleUrls: ['./info_dieta.page.scss'],
})
export class InfoDietaPage implements OnInit {
	iddieta;
	dieta = {
		detalle: [],
		fcrea: null,
		iddieta: null,
		idpercrea: null,
		ndieta: null,
		orden:null,
	};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		console.log(this.iddieta)
		this.cargarDieta();
		// this.cargarCie10();
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
	cargarDieta() {
		console.log(this)
		var self = this;
		let r = this.hrzServerService.query({
			metodo	: "infoDieta",
			iddieta	: this.iddieta
		}, 'servernutricion');
		r.subscribe(
			(s) => {
				this.dieta = s;
			});
	}
}