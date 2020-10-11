import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { Cie10Page } from '../cie10/cie10.page';
var LaboratorioPage = /** @class */ (function () {
    function LaboratorioPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.cod4_sel = {};
        this.cie10s = [];
        this.cie10Busqueda = "";
        this.solicitud = {
            detalle: [],
            cod_4_1: null,
            cod_4_2: null,
            cod_4_3: null,
            observacion: '',
        };
        this.filtros = {
            arrAnalisis: [],
            codigo: "",
            nanalisis: ""
        };
        this.slideOpts = {
            allowTouchMove: false,
        };
        this.punto = 0;
    }
    LaboratorioPage.prototype.ngOnInit = function () {
        console.log(this.idsolicitud);
        this.cargarSolicitud();
        // this.cargarCie10();
    };
    LaboratorioPage.prototype.cerrar = function () {
        this.modalCtrl.dismiss();
    };
    LaboratorioPage.prototype.enviar = function () {
        console.log("enviar", this.cod4_sel);
        this.modalCtrl.dismiss(this.cod4_sel);
    };
    LaboratorioPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    LaboratorioPage.prototype.limpiarBuscador = function () {
        this.filtros = {
            arrAnalisis: [],
            codigo: "",
            nanalisis: '',
        };
        this.buscarAnalisis(false);
    };
    LaboratorioPage.prototype.eliminarDetalle = function (detalle) {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "eliminarDetalleSolicitudBorrador",
            idsolicitud_detalle: detalle.idsolicitud_detalle,
        }, 'serverlaboratorio');
        r.subscribe(function (r) {
            if (r[0].estado == 'OK') {
                _this.cargarSolicitud();
            }
            else {
                if (r[0].estado) {
                    _this.hrzServerService.abrirAdvertencia("Error", null, r[0].estado);
                }
                else {
                    _this.cargarSolicitud();
                }
            }
        });
    };
    LaboratorioPage.prototype.buscarAnalisis = function (cambiarPunto1) {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "getAnalisis",
            idpaciente: this.solicitud['idpaciente'] || '',
            nanalisis: this.filtros['nanalisis'] || '',
            codigo: this.filtros['codigo'] || '',
            idsolicitud: this.solicitud['idsolicitud'] || '',
            idestado: 1
        }, 'serverlaboratorio');
        r.subscribe(function (r) {
            // console.log(r)
            _this.filtros['arrAnalisis'] = r;
            if (cambiarPunto1) {
                _this.verListaAnalisisDisponibles();
            }
            // console.log(this.solicitud['detalle'].filter(a => a.idanalisis == 3455));
        });
    };
    LaboratorioPage.prototype.esta_seleccionado = function (idanalisis) {
        return this.solicitud['detalle'].filter(function (a) { return a.idanalisis == idanalisis; }).length > 0;
    };
    LaboratorioPage.prototype.addDetalle = function (analisis) {
        var _this = this;
        if (this.solicitud['detalle'].filter(function (a) { return a.idanalisis == analisis.idanalisis; }).length > 0) {
            return;
        }
        if (analisis.agotado === 0 || analisis.idestado === 2) {
            this.hrzServerService.abrirAdvertencia(null, null, analisis.motivo_bloqueo);
            return;
        }
        if (analisis.idestado === 3 || analisis.idestado === 4) {
            // this.dict_analisis_bloqueado = {
            // 		analisis_bloqueado: analisis,
            // 		motivo_add_analisis_bloqueado: '',
            // 	}  
            // this.$refs.modal_add_analisis_bloqueado.abrirModal();
            // return;
        }
        var r = this.hrzServerService.query({
            metodo: "addDetalleSolicitud",
            idsolicitud: this.idsolicitud,
            idanalisis: analisis.idanalisis
        }, 'serverlaboratorio');
        r.subscribe(function (s) {
            if (s[0].estado == 'OK') {
                _this.cargarSolicitud();
            }
            else {
                if (s[0].estado) {
                    // this.$refs.mensaje_error.abrirModal("Error",)
                    _this.hrzServerService.abrirAdvertencia("Error", null, s[0].estado);
                }
                else {
                    _this.cargarSolicitud();
                }
            }
        });
        //this.item_seleccionado = null;
    };
    LaboratorioPage.prototype.quitarCIE10 = function () {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "quitarCIE10",
            idsolicitud: this.idsolicitud,
        }, 'serverlaboratorio');
        r.subscribe(function (s) {
            if (s[0].estado == 'OK') {
                _this.cargarSolicitud();
            }
            else {
                if (s[0].estado) {
                    // this.$refs.mensaje_error.abrirModal("Error",)
                    _this.hrzServerService.abrirAdvertencia("Error", null, s[0].estado);
                }
                else {
                    _this.cargarSolicitud();
                }
            }
        });
    };
    LaboratorioPage.prototype.agregarCIE10 = function (cod_4) {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "agregarCIE10",
            idsolicitud: this.idsolicitud,
            cod_4: cod_4
        }, 'serverlaboratorio');
        r.subscribe(function (s) {
            if (s[0].estado == 'OK') {
                _this.cargarSolicitud();
            }
            else {
                if (s[0].estado) {
                    // this.$refs.mensaje_error.abrirModal("Error",)
                    _this.hrzServerService.abrirAdvertencia("Error", null, s[0].estado);
                }
                else {
                    _this.cargarSolicitud();
                }
            }
        });
    };
    LaboratorioPage.prototype.seleccionarCIE10 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: Cie10Page,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (data) {
                            console.log(data);
                            this.agregarCIE10(data.cod_4);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LaboratorioPage.prototype.cargarSolicitud = function () {
        var _this = this;
        console.log(this);
        if (this.change) {
            this.change();
        }
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "getSolicitudInterna",
            idsolicitud: this.idsolicitud,
        }, 'serverlaboratorio');
        r.subscribe(function (s) {
            console.log(s);
            if (s[0] != undefined) {
                _this.solicitud = s[0];
                _this.buscarAnalisis(false);
            }
            else {
                _this.solicitud = {
                    detalle: [],
                    cod_4_1: null,
                    cod_4_2: null,
                    cod_4_3: null,
                    observacion: '',
                };
            }
        });
    };
    LaboratorioPage.prototype.confirmarSolicitud = function () {
        if (this.confirmado) {
            this.confirmado();
        }
    };
    LaboratorioPage.prototype.agregarObservacion = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            // enableBackdropDismiss: false,
                            backdropDismiss: false,
                            header: 'Observacion',
                            inputs: [
                                {
                                    name: 'observacion',
                                    type: 'text',
                                    value: this.solicitud.observacion,
                                    placeholder: 'Describa las observaciones'
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
                                    text: 'Guardar',
                                    handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var r;
                                        var _this = this;
                                        return tslib_1.__generator(this, function (_a) {
                                            console.log(d);
                                            r = this.hrzServerService.query({
                                                metodo: "guardarObservacionSolucitud",
                                                observacion: d.observacion,
                                                idsolicitud: this.idsolicitud
                                            }, 'serverlaboratorio');
                                            r.subscribe(function (r) {
                                                if (r[0].estado == "OK") {
                                                    _this.cargarSolicitud();
                                                }
                                                else {
                                                    if (r[0].estado) {
                                                        _this.hrzServerService.abrirAdvertencia(null, null, r[0].estado);
                                                    }
                                                    else {
                                                        _this.cargarSolicitud();
                                                    }
                                                }
                                            });
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
    LaboratorioPage.prototype.verAnalisisSeleccionados = function () {
        this.puntos.slideTo(1);
        this.punto = 1;
    };
    LaboratorioPage.prototype.verListaAnalisisDisponibles = function () {
        this.puntos.slideTo(0);
        this.punto = 0;
    };
    tslib_1.__decorate([
        ViewChild('puntos', { static: true }),
        tslib_1.__metadata("design:type", IonSlides)
    ], LaboratorioPage.prototype, "puntos", void 0);
    LaboratorioPage = tslib_1.__decorate([
        Component({
            selector: 'app-laboratorio',
            templateUrl: './laboratorio.page.html',
            styleUrls: ['./laboratorio.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], LaboratorioPage);
    return LaboratorioPage;
}());
export { LaboratorioPage };
//# sourceMappingURL=laboratorio.page.js.map