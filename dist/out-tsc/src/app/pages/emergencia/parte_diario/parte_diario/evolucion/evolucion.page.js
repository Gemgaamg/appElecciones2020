import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { ModalController, IonSlides, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LaboratorioPage } from 'src/app/asistentes/laboratorio/laboratorio.page';
import { RecetaPage } from 'src/app/asistentes/receta/receta.page';
import { InfoDietaPage } from 'src/app/asistentes/info_dieta/info_dieta.page';
import { DietaPage } from 'src/app/asistentes/dieta/dieta.page';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
var EvolucionPage = /** @class */ (function () {
    function EvolucionPage(hrzServerService, alertController, activatedRoute, modalCtrl, navCtrl) {
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
    EvolucionPage.prototype.ngOnInit = function () {
        this.cargarEvolucion();
    };
    EvolucionPage.prototype.slideChanged = function () {
        var _this = this;
        this.puntos.getActiveIndex().then(function (index) {
            _this.punto = index;
            _this.deslizando = false;
        });
    };
    EvolucionPage.prototype.siguiente = function () {
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
                metodo: "guardarCuadroClinicoForm05",
                idform05: this.idform05,
                cuadro_clinico: this.form05['cuadro_clinico']
            }, 'serverform05');
            r.subscribe(function (s) {
                if (s == "OK") {
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
    EvolucionPage.prototype.anterior = function () {
        this.deslizando = true;
        this.puntos.slidePrev();
    };
    EvolucionPage.prototype.btnSiguienteActivo = function () {
        if (this.orden_puntos[this.punto + ""] === 1) {
            return this.validarPunto1();
        }
        if (this.orden_puntos[this.punto + ""] === 2) {
            return this.validarPunto2();
        }
        return false;
    };
    EvolucionPage.prototype.btnAnteriorActivo = function () {
        if (this.punto == 0) {
            return false;
        }
        return true;
    };
    EvolucionPage.prototype.validarPunto1 = function () {
        return true;
    };
    EvolucionPage.prototype.validarPunto2 = function () {
        return true;
    };
    EvolucionPage.prototype.cargarEvolucion = function () {
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
    EvolucionPage.prototype.actualizarPlanTratamiento = function () {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "actualizarPlanTratamiento",
            idform05: this.idform05,
        }, 'serverform05');
        r.subscribe(function (s) {
            if (s != "") {
                _this.form05 = (s);
            }
        });
    };
    EvolucionPage.prototype.quitarPlan = function (plan) {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "quitarPlanTratamientoOtrosYDieta",
            idform05_plan: plan.idform05_plan,
        }, 'serverform05');
        r.subscribe(function (resp) {
            if (resp.estado == "OK") {
                _this.cargarEvolucion();
            }
            else {
                _this.hrzServerService.abrirAdvertencia(null, null, resp.estado);
            }
        });
    };
    EvolucionPage.prototype.nuevoPlanTratamientoIndicaciones = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            // enableBackdropDismiss: false,
                            backdropDismiss: false,
                            header: 'Agregar Prescripciones e Indicaciones',
                            inputs: [
                                {
                                    name: 'descripcion_plan',
                                    type: 'text',
                                    placeholder: 'Descripcion de la prescripción'
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
                                    text: 'Agregar',
                                    handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var r;
                                        var _this = this;
                                        return tslib_1.__generator(this, function (_a) {
                                            r = this.hrzServerService.query({
                                                metodo: "agregarPlanTratamientoOtros",
                                                descripcion_plan: d.descripcion_plan,
                                                idform05: this.idform05
                                            }, 'serverform05');
                                            r.subscribe(function (r) {
                                                if (r.estado == "OK") {
                                                    _this.cargarEvolucion();
                                                }
                                                else {
                                                    _this.hrzServerService.abrirAdvertencia(null, null, r.estado);
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
    EvolucionPage.prototype.nuevoPlanTratamientoNovedades = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            // enableBackdropDismiss: false,
                            backdropDismiss: false,
                            header: 'Nueva Novedades',
                            inputs: [
                                {
                                    name: 'descripcion_plan',
                                    type: 'text',
                                    placeholder: 'Descripcion de la Novedad'
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
                                    text: 'Agregar',
                                    handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var r;
                                        var _this = this;
                                        return tslib_1.__generator(this, function (_a) {
                                            r = this.hrzServerService.query({
                                                metodo: "agregarPlanTratamientoOtros",
                                                descripcion_plan: d.descripcion_plan,
                                                idform05: this.idform05
                                            }, 'serverform05');
                                            r.subscribe(function (r) {
                                                if (r.estado == "OK") {
                                                    _this.cargarEvolucion();
                                                }
                                                else {
                                                    _this.hrzServerService.abrirAdvertencia(null, null, r.estado);
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
    EvolucionPage.prototype.controlSignosVitales = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            // enableBackdropDismiss: false,
                            backdropDismiss: false,
                            header: 'AGREGAR CONTROL DE SIGNOS VITALES',
                            inputs: [
                                { name: 'frecuencia4', type: 'radio', label: 'CADA 4 HORAS', value: "1" },
                                { name: 'frecuencia6', type: 'radio', label: 'CADA 6 HORAS', value: "2" },
                                { name: 'frecuencia8', type: 'radio', label: 'CADA 8 HORAS', value: "3" },
                                { name: 'frecuencia12', type: 'radio', label: 'CADA 12 HORAS', value: "4" },
                                { name: 'frecuencia24', type: 'radio', label: 'CADA 24 HORAS', value: "5" },
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
                                    text: 'Agregar',
                                    handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var r;
                                        var _this = this;
                                        return tslib_1.__generator(this, function (_a) {
                                            if (d === undefined) {
                                                this.hrzServerService.abrirAdvertencia(null, 'Advertencia', "Por favor escoja una frecuencia", 'alert-peligro');
                                                return [2 /*return*/];
                                            }
                                            r = this.hrzServerService.query({
                                                metodo: "agregarPlanTratamientoCSV",
                                                idcontrol_frecuencia: d,
                                                idform05: this.idform05
                                            }, 'serverform05');
                                            r.subscribe(function (r) {
                                                if (r.estado == "OK") {
                                                    _this.cargarEvolucion();
                                                }
                                                else {
                                                    _this.hrzServerService.abrirAdvertencia(null, null, r.estado);
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
    EvolucionPage.prototype.controlGlicemia = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            // enableBackdropDismiss: false,
                            backdropDismiss: false,
                            header: 'AGREGAR CONTROL DE GLICEMIA',
                            inputs: [
                                { name: 'frecuencia4', type: 'radio', label: 'CADA 4 HORAS', value: "1" },
                                { name: 'frecuencia6', type: 'radio', label: 'CADA 6 HORAS', value: "2" },
                                { name: 'frecuencia8', type: 'radio', label: 'CADA 8 HORAS', value: "3" },
                                { name: 'frecuencia12', type: 'radio', label: 'CADA 12 HORAS', value: "4" },
                                { name: 'frecuencia24', type: 'radio', label: 'CADA 24 HORAS', value: "5" },
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
                                    text: 'Agregar',
                                    handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var r;
                                        var _this = this;
                                        return tslib_1.__generator(this, function (_a) {
                                            if (d === undefined) {
                                                this.hrzServerService.abrirAdvertencia(null, 'Advertencia', "Por favor escoja una frecuencia", 'alert-peligro');
                                                return [2 /*return*/];
                                            }
                                            r = this.hrzServerService.query({
                                                metodo: "agregarPlanTratamientoGlicemia",
                                                idcontrol_frecuencia: d,
                                                idform05: this.idform05
                                            }, 'serverform05');
                                            r.subscribe(function (r) {
                                                if (r.estado == "OK") {
                                                    _this.cargarEvolucion();
                                                }
                                                else {
                                                    _this.hrzServerService.abrirAdvertencia(null, null, r.estado);
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
    EvolucionPage.prototype.abrirSolicitudLaboratorio = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var prioridad, sala, cama, alert_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prioridad = 0;
                        sala = "";
                        cama = "";
                        if (!this.form05.idsolicitud) return [3 /*break*/, 1];
                        this.abrirModalLaboratorio();
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.alertController.create({
                            // enableBackdropDismiss: false,
                            backdropDismiss: false,
                            header: 'Prioridad del examen',
                            inputs: [
                                {
                                    name: 'radio1',
                                    type: 'radio',
                                    label: 'Urgente',
                                    value: '1',
                                    checked: true
                                },
                                {
                                    name: 'radio1',
                                    type: 'radio',
                                    label: 'Rutina',
                                    value: '2',
                                },
                                {
                                    name: 'radio1',
                                    type: 'radio',
                                    label: 'Control',
                                    value: '3',
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
                                    text: 'Siguiente',
                                    handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            prioridad = d;
                                            this.crearSolicitudBorrador(prioridad);
                                            return [2 /*return*/];
                                        });
                                    }); }
                                }
                            ]
                        })];
                    case 2:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EvolucionPage.prototype.abrirReceta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.form05.idcomprobante) {
                    this.abrirModalReceta();
                }
                else {
                    this.crearRecetaBorrador();
                }
                return [2 /*return*/];
            });
        });
    };
    EvolucionPage.prototype.crearRecetaBorrador = function () {
        // $.post('serverform05', 
        // {                        
        // idform05 : IDFORM05,
        // metodo : 'RecetaNuevaEnEvolu'       
        // }, function(response) 
        // {                          
        // 	self.Datos_Receta = response[0];                                          
        // 	if (self.Datos_Receta.estadox2==7)
        // 		{
        // 			// appVueGeneral.$refs.resumen_general.abrirModal('EL PACIENTE POSEE UNA RECETA IMCOMPLETA Y NO SE PUEDE REALIZAR OTRA',0);
        // 			this.hrzServerService.abrirAdvertencia(null, null, "El paciente posee una receta incompleta y no se puede realizar otra.");
        // 		}
        // 	else{
        // 		if (self.Datos_Receta.idcomprobantex2!=0){
        // 			self.form05.idcomprobante=self.Datos_Receta.idcomprobantex2;
        // 			appVueGeneral.$refs.receta_electronica_form005.abrirModal(self.Datos_Receta.idcomprobantex2, self.actualizarPlanTratamiento);
        // 		}                                                
        // 		}
        // });
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "RecetaNuevaEnEvolu",
            idform05: this.idform05
        }, 'serverform05');
        r.subscribe(function (r) {
            var d = r[0];
            if (d.estadox2 == 7) {
                _this.hrzServerService.abrirAdvertencia(null, null, "El paciente posee una receta incompleta y no se puede realizar otra.");
            }
            else if (d.idcomprobantex2 != 0) {
                _this.hrzServerService.abrirAdvertencia(null, null, "debe abrir receta " + d.idcomprobantex2);
                _this.form05.idcomprobante = d.idcomprobantex2;
                _this.abrirModalReceta();
                _this.cargarEvolucion();
            }
        });
    };
    EvolucionPage.prototype.crearSolicitudBorrador = function (prioridad) {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "crearSolicitudLaboratorio",
            prioridad: prioridad,
            sala: 'cama',
            cama: 'sala',
            idform05: this.idform05
        }, 'serverform05');
        r.subscribe(function (r) {
            if (r[0].estado == "OK") {
                _this.form05.idsolicitud = r[0].idsolicitud;
                _this.abrirModalLaboratorio();
                _this.cargarEvolucion();
            }
            else if (r[0].estado == 'SOLICITUD_PENDIENTE') {
                _this.hrzServerService.abrirAdvertencia(null, null, "Este paciente ya tiene una solicitud creada por usted en estado pendiente.");
            }
            else {
                _this.hrzServerService.abrirAdvertencia(null, null, r[0].estado);
            }
        });
    };
    EvolucionPage.prototype.verDetalleDieta = function (iddieta) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: InfoDietaPage,
                                componentProps: {
                                    iddieta: iddieta,
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
    EvolucionPage.prototype.verHistoriaClinica = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: HistoriaClinicaPage,
                                componentProps: {
                                    idpaciente: this.form05.idpaciente,
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
    EvolucionPage.prototype.abrirModalLaboratorio = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: LaboratorioPage,
                                componentProps: {
                                    idsolicitud: this.form05.idsolicitud,
                                    change: function () { self.actualizarPlanTratamiento(); },
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
    EvolucionPage.prototype.abrirModalReceta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: RecetaPage,
                                backdropDismiss: false,
                                componentProps: {
                                    idcomprobante: this.form05.idcomprobante,
                                    change: function () { self.actualizarPlanTratamiento(); },
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
    EvolucionPage.prototype.abrirModalDieta = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal, data, dietadata_1, alert_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: DietaPage,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (!data) return [3 /*break*/, 6];
                        dietadata_1 = data;
                        return [4 /*yield*/, this.alertController.create({
                                // enableBackdropDismiss: false,
                                backdropDismiss: false,
                                header: 'Seleccione tipo de dieta',
                                inputs: [
                                    {
                                        name: 'radio1',
                                        type: 'radio',
                                        label: 'Desayuno',
                                        value: '1',
                                        checked: true
                                    },
                                    {
                                        name: 'radio1',
                                        type: 'radio',
                                        label: 'Almuerzo',
                                        value: '2',
                                    },
                                    {
                                        name: 'radio1',
                                        type: 'radio',
                                        label: 'Merienda',
                                        value: '3',
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
                                        text: 'Siguiente',
                                        handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var alert2;
                                            var _this = this;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        dietadata_1.idtipo_comida = d;
                                                        return [4 /*yield*/, this.alertController.create({
                                                                // enableBackdropDismiss: false,
                                                                backdropDismiss: false,
                                                                header: 'Observacion (opcional)',
                                                                inputs: [
                                                                    {
                                                                        name: 'observacion',
                                                                        type: 'text',
                                                                        checked: true
                                                                    },
                                                                ],
                                                                buttons: [
                                                                    {
                                                                        text: 'Cancelar',
                                                                        role: 'cancel',
                                                                        cssClass: 'secondary',
                                                                        handler: function () {
                                                                        }
                                                                    }, {
                                                                        text: 'Siguiente',
                                                                        handler: function (d) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                                            return tslib_1.__generator(this, function (_a) {
                                                                                dietadata_1.observacion = d.observacion;
                                                                                this.agregarDieta(dietadata_1);
                                                                                return [2 /*return*/];
                                                                            });
                                                                        }); }
                                                                    }
                                                                ]
                                                            })];
                                                    case 1:
                                                        alert2 = _a.sent();
                                                        return [4 /*yield*/, alert2.present()];
                                                    case 2:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    }
                                ]
                            })];
                    case 4:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EvolucionPage.prototype.agregarDieta = function (dieta) {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "agregarPlanTratamientoDieta",
            iddieta: dieta.iddieta,
            idform05: this.idform05,
            idtipo_comida: dieta.idtipo_comida,
            observacion_dieta: dieta.observacion,
        }, 'serverform05');
        r.subscribe(function (r) {
            if (r.estado == "OK") {
                _this.cargarEvolucion();
            }
            else {
                _this.hrzServerService.abrirAdvertencia(null, null, r.estado);
            }
        });
    };
    EvolucionPage.prototype.anularEvolucion = function () {
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
    ], EvolucionPage.prototype, "puntos", void 0);
    EvolucionPage = tslib_1.__decorate([
        Component({
            selector: 'app-evolucion',
            templateUrl: './evolucion.page.html',
            styleUrls: ['./evolucion.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            AlertController,
            ActivatedRoute,
            ModalController,
            NavController])
    ], EvolucionPage);
    return EvolucionPage;
}());
export { EvolucionPage };
//# sourceMappingURL=evolucion.page.js.map