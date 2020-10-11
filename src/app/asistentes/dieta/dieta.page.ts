import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { InfoDietaPage } from '../info_dieta/info_dieta.page';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss'],
})
export class DietaPage implements OnInit {
  @Input() idform07;
  dieta_sel= {
    ndieta:""
  };
  dietas = [];
  constructor(
    protected hrzServerService: HrzServerService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarDietas();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  enviar() {
    this.modalCtrl.dismiss(this.dieta_sel);
  }
  
  trim(str){
    if(str){
      return str.trim();
    }
    return '';
    
  }
  async verDetalleDieta(iddieta){
		var self = this;
		const modal = await this.modalCtrl.create({
			component: InfoDietaPage,
			componentProps: {
				iddieta: iddieta,
			}
		});
		await modal.present();

		const { data } = await modal.onDidDismiss();
		console.log(data);
	}
  cargarDietas() {
    var self = this;
    let r = this.hrzServerService.query({
      metodo: "getListaDietas",
    }, 'servernutricion');
    r.subscribe(
      (s) => {
        
        if (s[0] != undefined) {
          this.dietas = s;
          console.log(this.dietas)
        } else {
          this.dietas = []
        }
      });
  }

}
