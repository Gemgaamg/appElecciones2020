import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ModalController, IonSlides, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NandaPage } from 'src/app/asistentes/nanda/nanda.page';
var EvolucionEnfPage = /** @class */ (function () {
    function EvolucionEnfPage(hrzServerService, alertController, activatedRoute, modalCtrl, navCtrl) {
        var _this = this;
        this.hrzServerService = hrzServerService;
        this.alertController = alertController;
        this.activatedRoute = activatedRoute;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        //requerido
        this.deslizando = false;
        this.form05 = {
            cuadro_clinico: '',
            idsolicitud: null,
            idpaciente: null,
            idcomprobante: null,
            idestado: null,
            planes_tratamiento: [],
            soapie: [],
        };
        this.punto = 0;
        this.orden_puntos = {
            "0": 1,
            "1": 2,
        };
        this.slideOpts = {
            allowTouchMove: false
        };
        this.activatedRoute.queryParams.subscribe(function (res) {
            console.log(res);
            _this.idform05 = res.idform05;
        });
    }
    EvolucionEnfPage.prototype.ngOnInit = function () {
        this.cargarEvolucion();
    };
    EvolucionEnfPage.prototype.slideChanged = function () {
        var _this = this;
        this.puntos.getActiveIndex().then(function (index) {
            _this.punto = index;
            _this.deslizando = false;
        });
    };
    EvolucionEnfPage.prototype.siguiente = function () {
        var _this = this;
        this.deslizando = true;
        if (!this.btnSiguienteActivo()) {
            return;
        }
        if (this.orden_puntos[this.punto + ""] === 1) {
            if (this.form05['cuadro_clinico'] === undefined) {
                return;
            }
            var r = this.hrzServerService.query({
                metodo: "guardarSoapieForm05",
                idform05: this.idform05,
                cuadro_clinico: this.form05['cuadro_clinico'],
                s: this.form05.soapie['soapie_s'] || "",
                o: this.form05.soapie['soapie_o'] || "",
                a: this.form05.soapie['soapie_a'] || "",
                p: this.form05.soapie['soapie_p'] || "",
                i: this.form05.soapie['soapie_i'] || "",
                e: this.form05.soapie['soapie_e'] || "",
            }, 'serverform05');
            r.subscribe(function (s) {
                if (s.estado == "OK") {
                    _this.puntos.slideNext();
                    _this.cargarEvolucion();
                }
                else {
                    _this.deslizando = false;
                    _this.hrzServerService.abrirAdvertencia(null, null, s);
                    return;
                }
            });
        }
        if (this.orden_puntos[this.punto + ""] === 2) { // terminar evolucion
            var r = this.hrzServerService.query({
                metodo: "terminarEvolucion",
                idform05: this.idform05,
            }, 'serverform05');
            r.subscribe(function (s) {
                if (s.estado == "OK") {
                    _this.hrzServerService.abrirAdvertencia('Bien', null, 'Evolucion realizada con exito');
                    _this.navCtrl.back();
                }
                else {
                    _this.deslizando = false;
                    _this.hrzServerService.abrirAdvertencia(null, null, s.estado);
                }
            });
        }
    };
    EvolucionEnfPage.prototype.anterior = function () {
        this.deslizando = true;
        this.puntos.slidePrev();
    };
    EvolucionEnfPage.prototype.btnSiguienteActivo = function () {
        if (this.orden_puntos[this.punto + ""] === 1) {
            return this.validarPunto1();
        }
        if (this.orden_puntos[this.punto + ""] === 2) {
            return this.validarPunto2();
        }
        return false;
    };
    EvolucionEnfPage.prototype.btnAnteriorActivo = function () {
        if (this.punto == 0) {
            return false;
        }
        return true;
    };
    EvolucionEnfPage.prototype.validarPunto1 = function () {
        return true;
    };
    EvolucionEnfPage.prototype.validarPunto2 = function () {
        return true;
    };
    EvolucionEnfPage.prototype.cargarEvolucion = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "obtenerForm05",
            idform05: this.idform05,
        }, 'serverform05');
        r.subscribe(function (s) {
            if (s != "") {
                _this.form05 = (s);
            }
        });
    };
    EvolucionEnfPage.prototype.abrirModalNanda = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: NandaPage,
                                componentProps: {
                                    idform05: this.idform05,
                                    change: function () { self.cargarEvolucion(); },
                                    confirmado: function () { modal.dismiss(); }
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
    EvolucionEnfPage.prototype.anularEvolucion = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: '¿Esta seguro de anular la evolucion?',
                            message: 'Al eliminar la evolucion se eliminaran los examenes de laboratorio y recetas hechas en esta evolucion',
                            buttons: [
                                {
                                    text: 'Cancelar'
                                },
                                {
                                    text: 'Aceptar',
                                    handler: function () {
                                        var r = _this.hrzServerService.query({
                                            metodo: "anular05",
                                            idform05: _this.idform05,
                                        }, 'serverform05');
                                        r.subscribe(function (r) {
                                            if (r.estado == "OK") {
                                                _this.navCtrl.back();
                                            }
                                            else {
                                                _this.hrzServerService.abrirAdvertencia(null, null, r.estado);
                                            }
                                        });
                                    }
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
    tslib_1.__decorate([
        ViewChild('puntos', { static: true }),
        tslib_1.__metadata("design:type", IonSlides)
    ], EvolucionEnfPage.prototype, "puntos", void 0);
    EvolucionEnfPage = tslib_1.__decorate([
        Component({
            selector: 'app-evolucion_enf',
            templateUrl: './evolucion_enf.page.html',
            styleUrls: ['./evolucion_enf.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            AlertController,
            ActivatedRoute,
            ModalController,
            NavController])
    ], EvolucionEnfPage);
    return EvolucionEnfPage;
}());
export { EvolucionEnfPage };
//# sourceMappingURL=evolucion_enf.page.js.map