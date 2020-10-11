import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ResumenSolicitudLaboratorioPage = /** @class */ (function () {
    function ResumenSolicitudLaboratorioPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.solicitud = {};
    }
    ResumenSolicitudLaboratorioPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarSolicitud();
    };
    ResumenSolicitudLaboratorioPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResumenSolicitudLaboratorioPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResumenSolicitudLaboratorioPage.prototype.cargarSolicitud = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.queryGET({
            metodo: "getSolicitud",
            idsolicitud: this.idsolicitud,
        }, 'serverlaboratorio');
        r.subscribe(function (s) {
            // console.log(s)
            _this.solicitud = s[0];
            console.log(_this.solicitud);
        });
    };
    ResumenSolicitudLaboratorioPage = tslib_1.__decorate([
        Component({
            selector: 'app-resumen_solicitud_laboratorio',
            templateUrl: './solicitud.page.html',
            styleUrls: ['./solicitud.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResumenSolicitudLaboratorioPage);
    return ResumenSolicitudLaboratorioPage;
}());
export { ResumenSolicitudLaboratorioPage };
//# sourceMappingURL=solicitud.page.js.map