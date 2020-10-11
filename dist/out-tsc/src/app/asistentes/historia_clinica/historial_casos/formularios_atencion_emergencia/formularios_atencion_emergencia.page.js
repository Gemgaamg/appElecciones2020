import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ParteDiarioAtencionEmergenciaPage } from 'src/app/asistentes/resumen_formularios/atencion_diaria_emergencia/parte_diario_atencion_emergencia.page';
import { ResumenF08Page } from 'src/app/asistentes/resumen_formularios/resumen_f08/resumen_f08.page';
import { ResumenF05Page } from 'src/app/asistentes/resumen_formularios/resumen_f05/resumen_f05.page';
import { ResumenSolicitudLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';
var FormulariosAtencionEmergenciaPage = /** @class */ (function () {
    function FormulariosAtencionEmergenciaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.formularios = [];
    }
    FormulariosAtencionEmergenciaPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarFormulariosAtencionEmergencia();
    };
    FormulariosAtencionEmergenciaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    FormulariosAtencionEmergenciaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    FormulariosAtencionEmergenciaPage.prototype.cargarFormulariosAtencionEmergencia = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosFormulariosEmerg",
            idatencion: this.idatencion,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.formularios = (s);
            console.log(_this.formularios);
        });
    };
    FormulariosAtencionEmergenciaPage.prototype.abrirFormulario = function (formulario) {
        if (formulario.tipoformx === 'ATENCION_BASICA') {
            this.abrirParteDiarioAtencionEmergencia(formulario.idformx);
        }
        else if (formulario.tipoformx === 'FORM053') {
        }
        else if (formulario.tipoformx === 'FORM007') {
        }
        else if (formulario.tipoformx === 'FORM010') {
            if (formulario.estadox == 1 || formulario.estadox == 7 || formulario.estadox == 10 || formulario.estadox == 11) {
                this.abrirResumenSolicitudLaboratorio(formulario.idformx);
            }
            if (formulario.estadox == 2 || formulario.estadox == 3) {
                this.abrirResultadoLaboratorio(formulario.idformx);
            }
        }
        else if (formulario.tipoformx === 'RECETA') {
            if (formulario.estadox != 0) {
                this.abrirResumenReceta(formulario.idformx);
            }
        }
        else if (formulario.tipoformx === 'FORM08') {
            this.abrirResumenF08(formulario.idformx);
        }
        else if (formulario.tipoformx === 'FORM005') {
            this.abrirResumenF05(formulario.idformx);
        }
    };
    FormulariosAtencionEmergenciaPage.prototype.abrirParteDiarioAtencionEmergencia = function (idatencion) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ParteDiarioAtencionEmergenciaPage,
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
    FormulariosAtencionEmergenciaPage.prototype.abrirResumenF08 = function (idform08) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResumenF08Page,
                                componentProps: {
                                    idform08: idform08,
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
    FormulariosAtencionEmergenciaPage.prototype.abrirResumenF05 = function (idform05) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResumenF05Page,
                                componentProps: {
                                    idform05: idform05,
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
    FormulariosAtencionEmergenciaPage.prototype.abrirResumenSolicitudLaboratorio = function (idsolicitud) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResumenSolicitudLaboratorioPage,
                                componentProps: {
                                    idsolicitud: idsolicitud,
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
    FormulariosAtencionEmergenciaPage.prototype.abrirResultadoLaboratorio = function (idsolicitud) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResultadosLaboratorioPage,
                                componentProps: {
                                    idsolicitud: idsolicitud,
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
    FormulariosAtencionEmergenciaPage.prototype.abrirResumenReceta = function (idreceta) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResumenRecetaPage,
                                componentProps: {
                                    idreceta: idreceta,
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
    FormulariosAtencionEmergenciaPage = tslib_1.__decorate([
        Component({
            selector: 'app-formularios_atencion_emergencia',
            templateUrl: './formularios_atencion_emergencia.page.html',
            styleUrls: ['./formularios_atencion_emergencia.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], FormulariosAtencionEmergenciaPage);
    return FormulariosAtencionEmergenciaPage;
}());
export { FormulariosAtencionEmergenciaPage };
//# sourceMappingURL=formularios_atencion_emergencia.page.js.map