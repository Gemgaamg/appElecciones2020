import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';

@Component({
  selector: 'app-solicitud-info',
  templateUrl: './solicitud-info.page.html',
  styleUrls: ['./solicitud-info.page.scss'],
})
export class SolicitudInfoPage implements OnInit {
  @Input() idform07;
  form07 = {
    caract_soli:'',
    cuadro:'',
    resexa:'',
    resima:'',
    resotro:'',
    detalle:'',
    planes:'',
  };
  constructor(
    protected hrzServerService: HrzServerService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cargarSolicitudInterconsulta();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

  cargarSolicitudInterconsulta() {
    var self = this;
    let r = this.hrzServerService.query({
      metodo: "ObtenerDatosSoli_Interc",
      idf007: this.idform07,
    }, 'server_con_exter');
    r.subscribe(
      (s) => {
        console.log(s);
        this.form07 = s[0];

      });
  }

}
