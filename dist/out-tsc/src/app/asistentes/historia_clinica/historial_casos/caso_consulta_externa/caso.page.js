import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { FormulariosConsultaExternaPage } from './formularios_consulta_externa/formularios.page';
var CasoConsultaExternaPage = /** @class */ (function () {
    function CasoConsultaExternaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.historial = [];
    }
    CasoConsultaExternaPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarCaso();
    };
    CasoConsultaExternaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    CasoConsultaExternaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    CasoConsultaExternaPage.prototype.cargarCaso = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "actualizarlISTADOCASo",
            idcaso: this.idcaso,
            idpre: this.idatencion,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.historial = s;
            console.log(_this.historial);
        });
    };
    // abrirAtencion(atencion) {
    // 	if (atencion.depart_areax == 2) {
    // 		this.abrirAtencionEmergencia(atencion.idprex);
    // 	} else if (atencion.depart_areax == 3) {
    // 		this.abrirAtencionConsultaExterna(atencion.casox, atencion.idprex);
    // 	}
    // }
    CasoConsultaExternaPage.prototype.abrirAtencion = function (atencion) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(atencion);
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: FormulariosConsultaExternaPage,
                                componentProps: {
                                    idatencion: atencion.idprex,
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        return [2 /*return*/];
                }
            });
        });
    };
    CasoConsultaExternaPage = tslib_1.__decorate([
        Component({
            selector: 'app-caso_consulta_externa',
            templateUrl: './caso.page.html',
            styleUrls: ['./caso.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], CasoConsultaExternaPage);
    return CasoConsultaExternaPage;
}());
export { CasoConsultaExternaPage };
//# sourceMappingURL=caso.page.js.map