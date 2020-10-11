import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-resumen_solicitud_laboratorio',
	templateUrl: './solicitud.page.html',
	styleUrls: ['./solicitud.page.scss'],
})
export class ResumenSolicitudLaboratorioPage implements OnInit {
	idsolicitud;
	solicitud: any = {};
	constructor(
		public alertController: AlertController,
		protected hrzServerService: HrzServerService,
		private modalCtrl: ModalController) { }

	ngOnInit() {
		// console.log(this.iddieta)
		this.cargarSolicitud();
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
	
	cargarSolicitud(){
		var self = this;
		let r = this.hrzServerService.queryGET({
			metodo: "getSolicitud",
			idsolicitud: this.idsolicitud,
		}, 'serverlaboratorio');
		r.subscribe(
			(s) => {
				// console.log(s)
				this.solicitud = s[0];
				console.log(this.solicitud)
			});
	}

}