import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { HistorialCasosPage } from './historial_casos/historial_casos.page';
import { HistorialPorEspecialidad } from './historial_especialidades/historial_especialidad.page';
import { AntecedentesPage } from './antecedentes/antecedentes.page';
var HistoriaClinicaPage = /** @class */ (function () {
    function HistoriaClinicaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.info_paciente = {
            nombre: '',
            fecha_nacimiento: '',
            sexo: '',
            padre: '',
            madre: '',
            direccion: '',
            telefono: '',
            celular: '',
        };
    }
    HistoriaClinicaPage.prototype.ngOnInit = function () {
        this.cargarPaciente();
    };
    HistoriaClinicaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    HistoriaClinicaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    HistoriaClinicaPage.prototype.cargarPaciente = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            acc: "info_paciente",
            idpaciente: this.idpaciente,
        }, 'app_administracion');
        r.subscribe(function (s) {
            console.log(s);
            _this.info_paciente = (s);
            console.log(_this.info_paciente);
        });
    };
    HistoriaClinicaPage.prototype.abrirHistorialAtencionDiaria = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: HistorialCasosPage,
                                componentProps: {
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
    HistoriaClinicaPage.prototype.abrirCarpetaPorEspecialidad = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: HistorialPorEspecialidad,
                                componentProps: {
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
    HistoriaClinicaPage.prototype.abrirAntecedentesPersonales = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: AntecedentesPage,
                                componentProps: {
                                    idpaciente: this.idpaciente,
                                    tipo_antecedente: 1,
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
    HistoriaClinicaPage.prototype.abrirAntecedentesFamiliares = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: AntecedentesPage,
                                componentProps: {
                                    idpaciente: this.idpaciente,
                                    tipo_antecedente: 2,
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
    HistoriaClinicaPage = tslib_1.__decorate([
        Component({
            selector: 'app-historia_clinica',
            templateUrl: './historia_clinica_general.page.html',
            styleUrls: ['./historia_clinica_general.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], HistoriaClinicaPage);
    return HistoriaClinicaPage;
}());
export { HistoriaClinicaPage };
//# sourceMappingURL=historia_clinica_general.page.js.map