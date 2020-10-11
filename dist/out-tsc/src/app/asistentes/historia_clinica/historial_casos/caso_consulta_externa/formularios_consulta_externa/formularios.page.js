import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
import { ResumenSolicitudLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.page';
import { ResumenF02Page } from 'src/app/asistentes/resumen_formularios/resumen_f02/resumen_f02.page';
import { ResumenF053CEPage } from 'src/app/asistentes/resumen_formularios/resumen_f053ce/resumen_f053ce.page';
import { ResumenF07CESolicitudPage } from 'src/app/asistentes/resumen_formularios/resumen_f07ce_solicitud/resumen_f07ce_solicitud.page';
var FormulariosConsultaExternaPage = /** @class */ (function () {
    function FormulariosConsultaExternaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.formularios = [];
    }
    FormulariosConsultaExternaPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarFormulariosCe();
    };
    FormulariosConsultaExternaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    FormulariosConsultaExternaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    FormulariosConsultaExternaPage.prototype.cargarFormulariosCe = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosFormulariosCE",
            idatencion: this.idatencion,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.formularios = (s);
            console.log(_this.formularios);
        });
    };
    FormulariosConsultaExternaPage.prototype.abrirFormulario = function (formulario) {
        console.log(formulario);
        if (formulario.tipoformx === 'FORM002') {
            this.abrirResumenF02(formulario.idformx);
        }
        else if (formulario.tipoformx === 'FORM053') {
            this.abrirResumenF053CE(formulario.idformx);
        }
        else if (formulario.tipoformx === 'FORM007') {
            this.abrirResumenF07CESolicitud(formulario.idformx);
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
    };
    FormulariosConsultaExternaPage.prototype.abrirResumenF053CE = function (idform053) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResumenF053CEPage,
                                componentProps: {
                                    idform053: idform053,
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
    FormulariosConsultaExternaPage.prototype.abrirResumenF07CESolicitud = function (idform07) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResumenF07CESolicitudPage,
                                componentProps: {
                                    idform07: idform07,
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
    FormulariosConsultaExternaPage.prototype.abrirResumenF02 = function (idform02) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: ResumenF02Page,
                                componentProps: {
                                    idform02: idform02,
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
    FormulariosConsultaExternaPage.prototype.abrirResumenSolicitudLaboratorio = function (idsolicitud) {
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
    FormulariosConsultaExternaPage.prototype.abrirResultadoLaboratorio = function (idsolicitud) {
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
    FormulariosConsultaExternaPage.prototype.abrirResumenReceta = function (idreceta) {
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
    FormulariosConsultaExternaPage = tslib_1.__decorate([
        Component({
            selector: 'app-formularios_consulta_externa',
            templateUrl: './formularios.page.html',
            styleUrls: ['./formularios.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], FormulariosConsultaExternaPage);
    return FormulariosConsultaExternaPage;
}());
export { FormulariosConsultaExternaPage };
//# sourceMappingURL=formularios.page.js.map