import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ResumenF02Page } from 'src/app/asistentes/resumen_formularios/resumen_f02/resumen_f02.page';
import { ResumenF07CESolicitudPage } from 'src/app/asistentes/resumen_formularios/resumen_f07ce_solicitud/resumen_f07ce_solicitud.page';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';
import { ParteDiarioAtencionEmergenciaPage } from 'src/app/asistentes/resumen_formularios/atencion_diaria_emergencia/parte_diario_atencion_emergencia.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
var AtencionesPorEspecialidadPage = /** @class */ (function () {
    function AtencionesPorEspecialidadPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.formularios = [];
    }
    AtencionesPorEspecialidadPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarFormularios();
    };
    AtencionesPorEspecialidadPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    AtencionesPorEspecialidadPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    AtencionesPorEspecialidadPage.prototype.cargarFormularios = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "actualizarlISTADO_OF_Espe",
            id_paciente: this.idpaciente,
            id_Espe: this.idespecialidad,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            _this.formularios = (s);
            console.log(_this.formularios);
        });
    };
    AtencionesPorEspecialidadPage.prototype.abrirFormulario = function (formulario) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (formulario.tipox.includes("FORM002, ANAMNESIS Y EXAMEN FISICO")) {
                    this.abrirResumen02(formulario.idformx);
                }
                else if (formulario.tipox.includes("FORM007")) {
                    this.abrirResumen07(formulario.idformx);
                }
                else if (formulario.tipox.includes("FORM010")) {
                    this.abrirResultadosLaboratorio(formulario.idformx);
                }
                else if (formulario.tipox.includes("RECETA")) {
                    this.abrirResumenReceta(formulario.idformx);
                }
                else if (formulario.tipox.includes("EMERGENCIA")) {
                    this.abrirResumenEmergencia(formulario.idformx);
                }
                console.log(formulario);
                return [2 /*return*/];
            });
        });
    };
    AtencionesPorEspecialidadPage.prototype.abrirResumen02 = function (idform02) {
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
    AtencionesPorEspecialidadPage.prototype.abrirResumen07 = function (idform07) {
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
    AtencionesPorEspecialidadPage.prototype.abrirResultadosLaboratorio = function (idsolicitud) {
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
    AtencionesPorEspecialidadPage.prototype.abrirResumenReceta = function (idreceta) {
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
    AtencionesPorEspecialidadPage.prototype.abrirResumenEmergencia = function (idatencion) {
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
    AtencionesPorEspecialidadPage = tslib_1.__decorate([
        Component({
            selector: 'app-atenciones_por_especialidad',
            templateUrl: './atenciones_por_especialidad.page.html',
            styleUrls: ['./atenciones_por_especialidad.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], AtencionesPorEspecialidadPage);
    return AtencionesPorEspecialidadPage;
}());
export { AtencionesPorEspecialidadPage };
//# sourceMappingURL=atenciones_por_especialidad.page.js.map