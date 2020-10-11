import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ActionSheetController, ModalController, IonSlides, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
// import { SolicitudInfoPage } from './solicitud-info/solicitud-info.page';
import { Location } from '@angular/common';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
import { ResumenSolicitudLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.page';
import { ResumenF05Page } from 'src/app/asistentes/resumen_formularios/resumen_f05/resumen_f05.page';
import { ResumenF08Page } from 'src/app/asistentes/resumen_formularios/resumen_f08/resumen_f08.page';
import { ParteDiarioAtencionEmergenciaPage } from 'src/app/asistentes/resumen_formularios/atencion_diaria_emergencia/parte_diario_atencion_emergencia.page';
var ParteDiarioEnfPage = /** @class */ (function () {
    function ParteDiarioEnfPage(hrzServerService, 
    // public actionSheetController: ActionSheetController,
    router, activatedRoute, modalCtrl, alertController, actionSheetController, location) {
        var _this = this;
        this.hrzServerService = hrzServerService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.modalCtrl = modalCtrl;
        this.alertController = alertController;
        this.actionSheetController = actionSheetController;
        this.location = location;
        this.deslizando = false;
        this.parte_diario_info = {
            id: null,
        };
        this.historial_proceso = [{}];
        this.info_parte = {};
        this.orden_puntos = {
            "info_parte": 0,
            "procesos": 1,
        };
        this.orden_puntos_inv = {
            0: "info_parte",
            1: "procesos",
        };
        this.slideOpts = {
            // allowTouchMove: false,
            autoHeight: true
        };
        this.tab_actual = 'info_parte';
        this.activatedRoute.queryParams.subscribe(function (res) {
            console.log(res);
            _this.idpre = res.idpre;
        });
    }
    ParteDiarioEnfPage.prototype.ionViewWillEnter = function () {
        this.getParteDiario();
        // this.ir_a('info_parte')
        this.actualizarInfoParte();
        this.actualizarProcesos();
    };
    ParteDiarioEnfPage.prototype.ngOnInit = function () {
    };
    ParteDiarioEnfPage.prototype.actualizarInfoParte = function () {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "BuscarDatosTriageXIDPRE",
            idatencion: this.idpre,
        }, 'servetriaje');
        r.subscribe(function (s) {
            _this.info_parte = s[0];
        });
    };
    ParteDiarioEnfPage.prototype.actualizarProcesos = function () {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "Form_Atencion_Emergencia",
            idatencion: this.idpre,
        }, 'servetriaje');
        r.subscribe(function (s) {
            _this.historial_proceso = s;
        });
    };
    ParteDiarioEnfPage.prototype.ir_a = function (t) {
        var _this = this;
        this.puntos.slideTo(this.orden_puntos[t]).then(function (s) {
            _this.deslizando = false;
            _this.tab_actual = t;
        });
    };
    ParteDiarioEnfPage.prototype.ir_a_ = function (t) {
        if (t == 'info_parte') {
            this.actualizarInfoParte();
        }
        else if (t == 'procesos') {
            this.actualizarProcesos();
        }
        else {
        }
    };
    ParteDiarioEnfPage.prototype.slideChanged = function () {
        var _this = this;
        console.log("cambiado");
        this.puntos.getActiveIndex().then(function (index) {
            _this.tab_actual = _this.orden_puntos_inv[index];
            _this.ir_a_(_this.tab_actual);
            _this.deslizando = false;
        });
    };
    ParteDiarioEnfPage.prototype.getParteDiario = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "getParteDiario",
            idpre: this.idpre,
        }, 'servetriaje');
        r.subscribe(function (s) {
            if (s != "") {
                console.log(s);
                _this.parte_diario_info = (s);
                var area = '';
                if (s.cate == 1 && s.referir == 0) {
                    area = 'Triaje Pediatrico';
                }
                if (s.cate == 1 && s.referir == 6) {
                    area = 'Pediatria';
                }
                if (s.referir == 7) {
                    area = 'Triaje Observacion';
                }
                if (s.cate == 6 && s.referir == 0) {
                    area = 'Triaje Azul';
                }
                if (s.cate == 5 && s.referir == 0) {
                    area = 'Triaje verde';
                }
                if (s.referir == 1) {
                    area = 'UCIM';
                }
                if (s.referir == 8) {
                    area = 'SHOCK';
                }
                if (s.referir == 2) {
                    area = 'Polivalente';
                }
                if (s.referir == 3) {
                    area = 'Ginecologia';
                }
                if (s.referir == 4) {
                    area = 'Cirugia';
                }
                if (s.referir == 5) {
                    area = 'Observacion';
                }
                _this.parte_diario_info['categoria'] = area;
                console.log(_this.parte_diario_info);
            }
        });
    };
    ParteDiarioEnfPage.prototype.cambiarCama = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            // enableBackdropDismiss: false,
                            backdropDismiss: false,
                            header: 'Detalle de cama',
                            inputs: [
                                {
                                    name: 'cama',
                                    type: 'number',
                                    label: 'Cama',
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Cambiar',
                                    handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var r;
                                        var _this = this;
                                        return tslib_1.__generator(this, function (_a) {
                                            console.log(d);
                                            if (d.cama !== "") {
                                                r = this.hrzServerService.query({
                                                    metodo: "cambiarCama",
                                                    idpre: this.idpre,
                                                    cama: d.cama,
                                                }, 'servetriaje');
                                                r.subscribe(function (s) {
                                                    if (s.estado === 'OK') {
                                                        _this.actualizarInfoParte();
                                                    }
                                                });
                                            }
                                            else {
                                                this.hrzServerService.abrirAdvertencia("Advertencia", null, "ESCRIBA UN NUMERO VALIDO");
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ParteDiarioEnfPage.prototype.crearEvolucionForm05 = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "crearEvolucionForm05",
            idpre: this.idpre,
            idtipo_evol: 2,
        }, 'serverform05');
        r.subscribe(function (s) {
            console.log(s);
            if (s.estado == 'OK') {
                console.log(s);
                s.idform05;
                _this.router.navigate(['/menu/cntenferm/evolucion_enf'], {
                    queryParams: { idform05: s.idform05 },
                });
            }
            else {
                _this.hrzServerService.abrirAdvertencia("Advertencia", null, s.estado);
            }
        });
    };
    ParteDiarioEnfPage.prototype.abrirOpcionesEvolucion = function (e) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parametros;
            return tslib_1.__generator(this, function (_a) {
                this.evolucion_seleccionado = e;
                console.log(e);
                if (e.tipoformx === 'FORM005' && e.estadox === 0) {
                    parametros = {
                        idform05: this.evolucion_seleccionado.idformx
                    };
                    this.router.navigate(['/menu/cntenferm/evolucion_enf'], {
                        queryParams: parametros,
                    });
                }
                else {
                    if (e.tipoformx === 'PDE') {
                        this.abrirParteDiarioAtencionEmergencia(e.idformx);
                    }
                    else if (e.tipoformx === 'FORM053') {
                    }
                    else if (e.tipoformx === 'FORM007') {
                    }
                    else if (e.tipoformx === 'FORM010') {
                        if (e.estadox == 1 || e.estadox == 7 || e.estadox == 10 || e.estadox == 11) {
                            this.abrirResumenSolicitudLaboratorio(e.idformx);
                        }
                        if (e.estadox == 2 || e.estadox == 3) {
                            this.abrirResultadoLaboratorio(e.idformx);
                        }
                    }
                    else if (e.tipoformx === 'RECETA') {
                        if (e.estadox != 0) {
                            this.abrirResumenReceta(e.idformx);
                        }
                    }
                    else if (e.tipoformx === 'FORM08' || e.tipoformx === "FORM008") {
                        this.abrirResumenF08(e.idformx);
                    }
                    else if (e.tipoformx === 'FORM005') {
                        this.abrirResumenF05(e.idformx);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    ParteDiarioEnfPage.prototype.abrirParteDiarioAtencionEmergencia = function (idatencion) {
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
    ParteDiarioEnfPage.prototype.abrirResumenF08 = function (idform08) {
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
    ParteDiarioEnfPage.prototype.abrirResumenF05 = function (idform05) {
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
    ParteDiarioEnfPage.prototype.abrirResumenSolicitudLaboratorio = function (idsolicitud) {
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
    ParteDiarioEnfPage.prototype.abrirResultadoLaboratorio = function (idsolicitud) {
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
    ParteDiarioEnfPage.prototype.abrirResumenReceta = function (idreceta) {
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
    ParteDiarioEnfPage.prototype.verHistoriaClinica = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: HistoriaClinicaPage,
                                componentProps: {
                                    idpaciente: this.parte_diario_info.id,
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
                        console.log(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('puntos', { static: true }),
        tslib_1.__metadata("design:type", IonSlides)
    ], ParteDiarioEnfPage.prototype, "puntos", void 0);
    ParteDiarioEnfPage = tslib_1.__decorate([
        Component({
            selector: 'app-parte_diario_enf',
            templateUrl: './parte_diario_enf.page.html',
            styleUrls: ['./parte_diario_enf.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            Router,
            ActivatedRoute,
            ModalController,
            AlertController,
            ActionSheetController,
            Location])
    ], ParteDiarioEnfPage);
    return ParteDiarioEnfPage;
}());
export { ParteDiarioEnfPage };
//# sourceMappingURL=parte_diario_enf.page.js.map