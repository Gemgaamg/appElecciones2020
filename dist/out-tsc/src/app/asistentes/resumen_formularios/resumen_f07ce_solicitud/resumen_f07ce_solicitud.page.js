import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ResumenF07CERespuestaPage } from '../resumen_f07ce_respuesta/resumen_f07ce_respuesta.page';
import { AtencionesPorEspecialidadPage } from '../../historia_clinica/historial_especialidades/atenciones_por_especialidad/atenciones_por_especialidad.page';
var ResumenF07CESolicitudPage = /** @class */ (function () {
    function ResumenF07CESolicitudPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.form07 = {
            idpaciente: null,
        };
    }
    ResumenF07CESolicitudPage.prototype.ngOnInit = function () {
        this.cargarForm07();
    };
    ResumenF07CESolicitudPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResumenF07CESolicitudPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResumenF07CESolicitudPage.prototype.cargarForm07 = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosSoli_Interc",
            idf007: this.idform07,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.form07 = s[0];
            console.log(_this.form07);
        });
    };
    ResumenF07CESolicitudPage.prototype.abrir07CERespuesta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResumenF07CERespuestaPage,
                                componentProps: {
                                    idform07: this.idform07,
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
    ResumenF07CESolicitudPage.prototype.abrirSolicitudesLaboratorios = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: AtencionesPorEspecialidadPage,
                                componentProps: {
                                    idespecialidad: 65,
                                    idpaciente: this.form07.idpaciente,
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResumenF07CESolicitudPage = tslib_1.__decorate([
        Component({
            selector: 'app-resumen_f07ce_solicitud',
            templateUrl: './resumen_f07ce_solicitud.page.html',
            styleUrls: ['./resumen_f07ce_solicitud.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResumenF07CESolicitudPage);
    return ResumenF07CESolicitudPage;
}());
export { ResumenF07CESolicitudPage };
//# sourceMappingURL=resumen_f07ce_solicitud.page.js.map