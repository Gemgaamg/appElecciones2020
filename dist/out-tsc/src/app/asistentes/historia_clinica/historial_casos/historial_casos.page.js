import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { FormulariosAtencionEmergenciaPage } from './formularios_atencion_emergencia/formularios_atencion_emergencia.page';
import { CasoConsultaExternaPage } from './caso_consulta_externa/caso.page';
var HistorialCasosPage = /** @class */ (function () {
    function HistorialCasosPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.historial = [];
    }
    HistorialCasosPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarHistorialAtencionDiaria();
    };
    HistorialCasosPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    HistorialCasosPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    HistorialCasosPage.prototype.cargarHistorialAtencionDiaria = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ActualizarListaCasoEstudiosAtencion",
            id_paciente: this.idpaciente,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.historial = (s);
            console.log(_this.historial);
        });
    };
    HistorialCasosPage.prototype.abrirAtencion = function (atencion) {
        if (atencion.depart_areax == 2) {
            this.abrirAtencionEmergencia(atencion.idprex);
        }
        else if (atencion.depart_areax == 3) {
            this.abrirAtencionConsultaExterna(atencion.casox, atencion.idprex);
        }
    };
    HistorialCasosPage.prototype.abrirAtencionEmergencia = function (idatencion) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: FormulariosAtencionEmergenciaPage,
                                componentProps: {
                                    idatencion: idatencion,
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
    HistorialCasosPage.prototype.abrirAtencionConsultaExterna = function (idcaso, idatencion) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: CasoConsultaExternaPage,
                                componentProps: {
                                    idcaso: idcaso,
                                    idatencion: idatencion,
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
    HistorialCasosPage = tslib_1.__decorate([
        Component({
            selector: 'app-historial_casos',
            templateUrl: './historial_casos.page.html',
            styleUrls: ['./historial_casos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], HistorialCasosPage);
    return HistorialCasosPage;
}());
export { HistorialCasosPage };
//# sourceMappingURL=historial_casos.page.js.map