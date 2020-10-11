import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
	selector: 'app-resultados_laboratorio',
	templateUrl: './resultados.page.html',
	styleUrls: ['./resultados.page.scss'],
})
export class ResultadosLaboratorioPage implements OnInit {
	idsolicitud;
	paciente;
	det = [];
	det_sin_resultado = [];
	det_eliminados = [];
	historial = [];
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
			metodo: "ver_resultados_por_id",
			idsolicitud: this.idsolicitud,
		}, 'serverlaboratorio');
		r.subscribe(
			(s) => {
				// console.log(s)
				if(s.resultado.length>0){
					this.paciente = s.resultado[0].pacix;
					this.det = s.resultado;
					this.det_sin_resultado = s.examenes_sin_resultados;
					this.det_eliminados = s.examenes_eliminados;
					this.historial = s.historial;
				}
			});
	}

}