import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { AtencionesPorEspecialidadPage } from './atenciones_por_especialidad/atenciones_por_especialidad.page';
var HistorialPorEspecialidad = /** @class */ (function () {
    function HistorialPorEspecialidad(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.carpetas = [];
    }
    HistorialPorEspecialidad.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarHistorialAtencionDiaria();
    };
    HistorialPorEspecialidad.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    HistorialPorEspecialidad.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    HistorialPorEspecialidad.prototype.cargarHistorialAtencionDiaria = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "actualizarlISTADO_x_espe",
            id_paciente: this.idpaciente,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.carpetas = (s);
            console.log(_this.carpetas);
        });
    };
    HistorialPorEspecialidad.prototype.abrirAtenciones = function (carpeta) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(carpeta);
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: AtencionesPorEspecialidadPage,
                                componentProps: {
                                    idespecialidad: carpeta.idespex,
                                    idpaciente: this.idpaciente,
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
    HistorialPorEspecialidad = tslib_1.__decorate([
        Component({
            selector: 'app-historial_especialidad',
            templateUrl: './historial_especialidad.page.html',
            styleUrls: ['./historial_especialidad.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], HistorialPorEspecialidad);
    return HistorialPorEspecialidad;
}());
export { HistorialPorEspecialidad };
//# sourceMappingURL=historial_especialidad.page.js.map