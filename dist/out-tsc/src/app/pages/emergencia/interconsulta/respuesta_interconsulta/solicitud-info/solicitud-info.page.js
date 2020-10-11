import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var SolicitudInfoPage = /** @class */ (function () {
    function SolicitudInfoPage(hrzServerService, modalCtrl) {
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.form07 = {
            caract_soli: '',
            cuadro: '',
            resexa: '',
            resima: '',
            resotro: '',
            detalle: '',
            planes: '',
        };
    }
    SolicitudInfoPage.prototype.ngOnInit = function () {
        this.cargarSolicitudInterconsulta();
    };
    SolicitudInfoPage.prototype.dismiss = function () {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss();
    };
    SolicitudInfoPage.prototype.cargarSolicitudInterconsulta = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosSoli_Interc",
            idf007: this.idform07,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            console.log(s);
            _this.form07 = s[0];
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SolicitudInfoPage.prototype, "idform07", void 0);
    SolicitudInfoPage = tslib_1.__decorate([
        Component({
            selector: 'app-solicitud-info',
            templateUrl: './solicitud-info.page.html',
            styleUrls: ['./solicitud-info.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ModalController])
    ], SolicitudInfoPage);
    return SolicitudInfoPage;
}());
export { SolicitudInfoPage };
//# sourceMappingURL=solicitud-info.page.js.map