import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ParteDiarioAtencionEmergenciaPage = /** @class */ (function () {
    function ParteDiarioAtencionEmergenciaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.parte_diario = {};
    }
    ParteDiarioAtencionEmergenciaPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarParteDiarioAtencionEmergencia();
    };
    ParteDiarioAtencionEmergenciaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ParteDiarioAtencionEmergenciaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ParteDiarioAtencionEmergenciaPage.prototype.cargarParteDiarioAtencionEmergencia = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosCUADRO_BASICO",
            idcuadro_basico: this.idatencion,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.parte_diario = s[0];
            console.log(_this.parte_diario);
        });
    };
    ParteDiarioAtencionEmergenciaPage = tslib_1.__decorate([
        Component({
            selector: 'app-parte_diario_atencion_emergencia',
            templateUrl: './parte_diario_atencion_emergencia.page.html',
            styleUrls: ['./parte_diario_atencion_emergencia.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ParteDiarioAtencionEmergenciaPage);
    return ParteDiarioAtencionEmergenciaPage;
}());
export { ParteDiarioAtencionEmergenciaPage };
//# sourceMappingURL=parte_diario_atencion_emergencia.page.js.map