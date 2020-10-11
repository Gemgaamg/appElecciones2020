import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ModalController, IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SolicitudInfoPage } from './solicitud-info/solicitud-info.page';
import { Cie10Page } from 'src/app/asistentes/cie10/cie10.page';
import { Location } from '@angular/common';
var RespuestaInterconsultaPage = /** @class */ (function () {
    function RespuestaInterconsultaPage(hrzServerService, 
    // public actionSheetController: ActionSheetController,
    activatedRoute, modalCtrl, location) {
        var _this = this;
        this.hrzServerService = hrzServerService;
        this.activatedRoute = activatedRoute;
        this.modalCtrl = modalCtrl;
        this.location = location;
        this.form07 = {
            cuadrointer: '',
            resucriterio: '',
            plandiag: '',
            plantrata: '',
            cod_4_respuesta: '0',
            tcie1_respuesta: '0',
            cod_4_2_respuesta: '0',
            tcie2_respuesta: '0',
            cod_4_3_respuesta: '0',
            tcie3_respuesta: '0',
            cod_4_4_respuesta: '0',
            tcie4_respuesta: '0',
        };
        this.punto = 0;
        this.orden_puntos = {
            "0": 6,
            "1": 7,
            "2": 8,
            "3": 9,
            "4": 10,
        };
        this.slideOpts = {
            allowTouchMove: false
        };
        this.deslizando = false;
        this.activatedRoute.queryParams.subscribe(function (res) {
            console.log(res);
            _this.idform07 = res.idform07;
        });
    }
    RespuestaInterconsultaPage.prototype.ngOnInit = function () {
        this.cargarSolicitudInterconsulta();
    };
    RespuestaInterconsultaPage.prototype.slideChanged = function () {
        var _this = this;
        this.puntos.getActiveIndex().then(function (index) {
            _this.punto = index;
            _this.deslizando = false;
        });
    };
    RespuestaInterconsultaPage.prototype.siguiente = function () {
        var _this = this;
        this.deslizando = true;
        if (!this.btnSiguienteActivo()) {
            return;
        }
        if (this.orden_puntos[this.punto + ""] === 6) {
            var r = this.hrzServerService.query({
                metodo: "guardar_punto_6",
                idform07: this.idform07,
                cuadrointer: this.form07['cuadrointer']
            }, 'serverform07');
            r.subscribe(function (s) {
                if (s == "OK") {
                    _this.puntos.slideNext();
                    _this.cargarSolicitudInterconsulta();
                }
            });
        }
        if (this.orden_puntos[this.punto + ""] === 7) {
            var r = this.hrzServerService.query({
                metodo: "guardar_punto_7",
                idform07: this.idform07,
                resucriterio: this.form07['resucriterio']
            }, 'serverform07');
            r.subscribe(function (s) {
                if (s == "OK") {
                    _this.puntos.slideNext();
                    _this.cargarSolicitudInterconsulta();
                }
            });
        }
        if (this.orden_puntos[this.punto + ""] === 8) {
            var r = this.hrzServerService.query({
                metodo: "guardar_punto_8",
                idform07: this.idform07,
                cod_4_respuesta: this.form07['cod_4_respuesta'] ? this.form07['cod_4_respuesta'] : '0',
                tcie1_respuesta: this.form07['tcie1_respuesta'] ? this.form07['tcie1_respuesta'] : '0',
                cod_4_2_respuesta: this.form07['cod_4_2_respuesta'] ? this.form07['cod_4_2_respuesta'] : '0',
                tcie2_respuesta: this.form07['tcie2_respuesta'] ? this.form07['tcie2_respuesta'] : '0',
                cod_4_3_respuesta: this.form07['cod_4_3_respuesta'] ? this.form07['cod_4_3_respuesta'] : '0',
                tcie3_respuesta: this.form07['tcie3_respuesta'] ? this.form07['tcie3_respuesta'] : '0',
                cod_4_4_respuesta: this.form07['cod_4_4_respuesta'] ? this.form07['cod_4_4_respuesta'] : '0',
                tcie4_respuesta: this.form07['tcie4_respuesta'] ? this.form07['tcie4_respuesta'] : '0',
            }, 'serverform07');
            r.subscribe(function (s) {
                if (s == "OK") {
                    _this.puntos.slideNext();
                    _this.cargarSolicitudInterconsulta();
                }
            });
        }
        if (this.orden_puntos[this.punto + ""] === 9) {
            var r = this.hrzServerService.query({
                metodo: "guardar_punto_9",
                idform07: this.idform07,
                plandiag: this.form07['plandiag']
            }, 'serverform07');
            r.subscribe(function (s) {
                if (s == "OK") {
                    _this.puntos.slideNext();
                    _this.cargarSolicitudInterconsulta();
                }
            });
        }
        if (this.orden_puntos[this.punto + ""] === 10) {
            // this.hrzServerService.abrirLoading();
            var r = this.hrzServerService.query({
                metodo: "guardar_punto_10",
                idform07: this.idform07,
                plantrata: this.form07['plantrata']
            }, 'serverform07');
            r.subscribe(function (s) {
                console.log(s);
                if (s == "OK") {
                    if ((_this.validarPunto6() && _this.validarPunto7() && _this.validarPunto8() && _this.validarPunto9() && _this.validarPunto10())) {
                        var r_1 = _this.hrzServerService.query({
                            metodo: "responder_interconsulta",
                            idform07: _this.idform07,
                        }, 'serverform07');
                        r_1.subscribe(function (s) {
                            var msj = s.estado;
                            console.log(s);
                            if (msj != "OK") {
                                console.log(s);
                                // this.hrzServerService.cerrarLoading();
                                _this.hrzServerService.abrirAdvertencia('Error', 'No se pudo responder la interconsulta', msj);
                            }
                            else {
                                if (s.iddocumento) {
                                    // this.hrzServerService.cerrarLoading();
                                    _this.hrzServerService.abrirAdvertencia('Bien', null, 'La interconsulta fue respondida con exito');
                                    _this.location.back();
                                }
                            }
                        });
                    }
                }
                else {
                    _this.hrzServerService.cerrarLoading();
                    _this.hrzServerService.abrirAdvertencia('Error', null, 'No se pudo responder la interconsulta');
                }
            });
        }
    };
    RespuestaInterconsultaPage.prototype.anterior = function () {
        this.deslizando = true;
        this.puntos.slidePrev();
    };
    RespuestaInterconsultaPage.prototype.btnSiguienteActivo = function () {
        if (this.orden_puntos[this.punto + ""] === 6) {
            return this.validarPunto6();
        }
        if (this.orden_puntos[this.punto + ""] === 7) {
            return this.validarPunto7();
        }
        if (this.orden_puntos[this.punto + ""] === 8) {
            return this.validarPunto8();
        }
        if (this.orden_puntos[this.punto + ""] === 9) {
            return this.validarPunto9();
        }
        if (this.orden_puntos[this.punto + ""] === 10) {
            return this.validarPunto10();
        }
        return false;
    };
    RespuestaInterconsultaPage.prototype.btnAnteriorActivo = function () {
        if (this.punto == 0) {
            return false;
        }
        return true;
    };
    RespuestaInterconsultaPage.prototype.validarPunto6 = function () {
        if (this.form07['cuadrointer']) {
            if (this.form07['cuadrointer'].trim() !== '') {
                return true;
            }
        }
        return false;
    };
    RespuestaInterconsultaPage.prototype.validarPunto7 = function () {
        if (this.form07['resucriterio']) {
            if (this.form07['resucriterio'].trim() !== '') {
                return true;
            }
        }
        return false;
    };
    RespuestaInterconsultaPage.prototype.validarPunto8 = function () {
        // if(this.form07['resucriterio']){
        // 	if(this.form07['resucriterio'].trim() !== ''){
        return true;
        // }
        // }
        // return false;
    };
    RespuestaInterconsultaPage.prototype.validarPunto9 = function () {
        if (this.form07['plandiag']) {
            if (this.form07['plandiag'].trim() !== '') {
                return true;
            }
        }
        return false;
    };
    RespuestaInterconsultaPage.prototype.validarPunto10 = function () {
        if (this.form07['plantrata']) {
            if (this.form07['plantrata'].trim() !== '') {
                return true;
            }
        }
        return false;
    };
    RespuestaInterconsultaPage.prototype.quitarCie10 = function (i) {
        if (i == 1) {
            this.form07['tcie1_respuesta'] = '0';
            this.form07['cod_4_respuesta'] = undefined;
            return;
        }
        if (i == 2) {
            this.form07['tcie2_respuesta'] = '0';
            this.form07['cod_4_2_respuesta'] = undefined;
            return;
        }
        if (i == 3) {
            this.form07['tcie3_respuesta'] = '0';
            this.form07['cod_4_3_respuesta'] = undefined;
            return;
        }
        if (i == 4) {
            this.form07['tcie4_respuesta'] = '0';
            this.form07['cod_4_4_respuesta'] = undefined;
            return;
        }
    };
    RespuestaInterconsultaPage.prototype.cargarSolicitudInterconsulta = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "obtenerInterconsulta",
            idform07: this.idform07,
        }, 'serverform07');
        r.subscribe(function (s) {
            if (s != "") {
                console.log(s);
                _this.form07 = (s);
                if (!_this.form07['cod_4_respuesta'] || _this.form07['cod_4_respuesta'] == '0') {
                    _this.form07['tcie1_respuesta'] = '0';
                    _this.form07['cod_4_respuesta'] = undefined;
                }
                if (!_this.form07['cod_4_2_respuesta'] || _this.form07['cod_4_2_respuesta'] == '0') {
                    _this.form07['tcie2_respuesta'] = '0';
                    _this.form07['cod_4_2_respuesta'] = undefined;
                }
                if (!_this.form07['cod_4_3_respuesta'] || _this.form07['cod_4_3_respuesta'] == '0') {
                    _this.form07['tcie3_respuesta'] = '0';
                    _this.form07['cod_4_3_respuesta'] = undefined;
                }
                if (!_this.form07['cod_4_4_respuesta'] || _this.form07['cod_4_4_respuesta'] == '0') {
                    _this.form07['tcie4_respuesta'] = '0';
                    _this.form07['cod_4_4_respuesta'] = undefined;
                }
            }
        });
    };
    RespuestaInterconsultaPage.prototype.abrirModalSolicitudInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: SolicitudInfoPage,
                            componentProps: {
                                idform07: this.idform07,
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
    RespuestaInterconsultaPage.prototype.abrirModalCie10 = function (modelo) {
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
                            this.form07[modelo] = data.cod_4;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('puntos', { static: true }),
        tslib_1.__metadata("design:type", IonSlides)
    ], RespuestaInterconsultaPage.prototype, "puntos", void 0);
    RespuestaInterconsultaPage = tslib_1.__decorate([
        Component({
            selector: 'app-respuesta_interconsulta',
            templateUrl: './respuesta_interconsulta.page.html',
            styleUrls: ['./respuesta_interconsulta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ActivatedRoute,
            ModalController,
            Location])
    ], RespuestaInterconsultaPage);
    return RespuestaInterconsultaPage;
}());
export { RespuestaInterconsultaPage };
//# sourceMappingURL=respuesta_interconsulta.page.js.map