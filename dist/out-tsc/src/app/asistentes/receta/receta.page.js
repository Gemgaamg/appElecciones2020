import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonSlides } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var RecetaPage = /** @class */ (function () {
    function RecetaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.receta = {
            detalleCuadroBasico: [],
            detalleNoCuadroBasico: [],
            observacion: '',
        };
        this.filtros = {
            arrMedicamentoCB: [],
            arrMedicamentoNoCB: [],
            nmedicamento: ""
        };
        this.cmbFrecuencia = [
            { name: 'frecuencia6', type: 'radio', label: '4 HORAS', value: "6" },
            { name: 'frecuencia4', type: 'radio', label: '6 HORAS', value: "4" },
            { name: 'frecuencia3', type: 'radio', label: '8 HORAS', value: "3" },
            { name: 'frecuencia2', type: 'radio', label: '12 HORAS', value: "2" },
            { name: 'frecuencia1', type: 'radio', label: '24 HORAS', value: "1" }
        ];
        this.cmbDosis = [];
        this.cmbCantidad = [
            { name: 'cantidad', type: 'number', placeholder: 'Cantidad' },
            { name: 'uso', type: 'text', value: '', placeholder: 'Uso' }
        ];
        this.opcionesMedicamento = {
            cmbFrecuencia: this.cmbFrecuencia,
            cmbDosis: this.cmbDosis,
            cmbCantidadUso: this.cmbCantidad
        };
        this.slideOpts = {
            allowTouchMove: false,
            initialSlide: 1,
            speed: 400
            // autoHeight: true
        };
        this.punto = 1;
    }
    RecetaPage.prototype.ngOnInit = function () {
        this.cargarReceta();
    };
    RecetaPage.prototype.cerrar = function () {
        this.modalCtrl.dismiss();
    };
    RecetaPage.prototype.cargarReceta = function () {
        if (this.change) {
            this.change();
        }
        this.actualizarCuadroBasico();
        this.actualizarNoCuadroBasico();
        this.actualizarNotasAdicionales();
        // setTimeout(
        // 	this.verAnalisisSeleccionados,5000
        // );
        this.verAnalisisSeleccionados();
        var self = this;
    };
    RecetaPage.prototype.actualizarCuadroBasico = function () {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "actualizarGridCB",
            idreceta: this.idcomprobante,
        }, 'serverform05');
        r.subscribe(function (response) {
            _this.receta.detalleCuadroBasico = response;
        });
    };
    RecetaPage.prototype.actualizarNoCuadroBasico = function () {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "actualizarGridNoCB",
            idreceta: this.idcomprobante,
        }, 'serverform05');
        r.subscribe(function (response) {
            _this.receta.detalleNoCuadroBasico = response;
        });
    };
    RecetaPage.prototype.actualizarNotasAdicionales = function () {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "actualizarNOtasAdicionales",
            idreceta: this.idcomprobante,
        }, 'serverform05');
        r.subscribe(function (response) {
            _this.receta.observacion = response[0].observacion;
        });
    };
    RecetaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    RecetaPage.prototype.buscarMedicamento = function () {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "MedicamentosCBDisponiblesTOF005",
            idreceta: this.idcomprobante,
            nprod: this.filtros.nmedicamento || '',
        }, 'server_con_exter');
        r.subscribe(function (r) {
            _this.filtros.arrMedicamentoCB = r;
            _this.verListaMedicamentosDisponibles();
        });
        var r2 = this.hrzServerService.query({
            metodo: "MedicamentosNoCBDisponiblesTOF005",
            nprod: this.filtros.nmedicamento || '',
        }, 'server_con_exter');
        r2.subscribe(function (r) {
            console.log(r);
            _this.filtros.arrMedicamentoNoCB = r;
            _this.verListaMedicamentosDisponibles();
        });
    };
    RecetaPage.prototype.alert1 = function (propiedad, inputs, cb) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: propiedad,
                            message: this.medicamento_seleccionado.nprod || this.medicamento_seleccionado.prodncb,
                            backdropDismiss: false,
                            inputs: inputs,
                            cssClass: 'upper',
                            buttons: [
                                { text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: function () { } },
                                {
                                    text: 'Ok',
                                    handler: function (d) {
                                        if (typeof d === 'string') {
                                            _this.medicamento_seleccionado[propiedad] = d;
                                        }
                                        else {
                                            _this.medicamento_seleccionado = Object.assign(d, _this.medicamento_seleccionado);
                                        }
                                        cb();
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
    RecetaPage.prototype.addDetalleNoCB = function (medicamento) {
        var _this = this;
        this.medicamento_seleccionado = medicamento;
        this.alert1('Cantidad y Uso', this.opcionesMedicamento.cmbCantidadUso, function () {
            var m = _this.medicamento_seleccionado;
            console.log(m);
            if (m.cantidad === null || m.cantidad.trim() === "" || m.cantidad === 0) {
                _this.hrzServerService.abrirAdvertencia(null, 'Advertencia', "Por favor escriba una cantidad valida", 'alert-peligro');
                return;
            }
            if (m.uso === null || m.uso.trim() === '') {
                '-';
            }
            // this.hrzServerService.abrirAdvertencia(null,
            // 	m.prodncb,
            // 	m.uso,
            // 	null,
            // 	() => {
            _this.ingresarMedicamentoNoCBAReceta();
            // }
            // );
        });
    };
    RecetaPage.prototype.addDetalleCB = function (medicamento) {
        var _this = this;
        if (medicamento.estado === 0) {
            return;
        }
        this.medicamento_seleccionado = medicamento;
        // console.log(medicamento)
        this.obtenerDosisMaximaDelMedicamento(function () {
            _this.obtenerDetallesAdicionalesMedicamento(function () {
                // console.log(medicamento);
                var esSolido = false;
                var llevaCombo = false;
                if (_this.medicamento_seleccionado.esinsumox == 0) {
                    if (_this.medicamento_seleccionado.liquidosx == 0) {
                        esSolido = true;
                        if (_this.medicamento_seleccionado.llevacombox != 0) {
                            llevaCombo = true;
                        }
                    }
                }
                console.log("esSolido" + esSolido);
                console.log("llevaCombo" + llevaCombo);
                if (!esSolido) {
                    _this.alert1('Cantidad y Uso', _this.opcionesMedicamento.cmbCantidadUso, function () {
                        var m = _this.medicamento_seleccionado;
                        console.log(m);
                        if (m.cantidad === null || m.cantidad.trim() === "" || m.cantidad === 0) {
                            _this.hrzServerService.abrirAdvertencia(null, 'Advertencia', "Por favor escriba una cantidad valida", 'alert-peligro');
                            return;
                        }
                        if (m.cantidad > m.maxhospix) {
                            _this.hrzServerService.abrirAdvertencia(null, 'Peligro', "El Medicamento - " + (m.nprod) + " - solo puede pedir un maximo de " + (m.maxhospix) + " cantidades(es)", 'alert-peligro');
                        }
                        else {
                            if (m.uso === null || m.uso.trim() === '') {
                                m.uso = '-';
                            }
                            // this.hrzServerService.abrirAdvertencia(null,
                            // 	m.nprod,
                            // 	m.uso,
                            // 	null,
                            // 	() => {
                            _this.ingresarMedicamentoCBAReceta();
                            // 	}
                            // );
                        }
                    });
                }
                else {
                    _this.medicamento_seleccionado.Dosis = 1;
                    if (llevaCombo) {
                        _this.obtenerCmbDosisDeMedicamento(function () {
                            _this.alert1("Dosis", _this.opcionesMedicamento.cmbDosis, function () {
                                _this.alert1("Frecuencia", _this.opcionesMedicamento.cmbFrecuencia, function () {
                                    var m = _this.medicamento_seleccionado;
                                    m.cantidad = m.Frecuencia * m.Dosis;
                                    if (m.cantidad > 1) {
                                        m.uso = 'TOMAR ' + m.cantidad + ' MEDICAMENTOS DIARIO POR 1 DIA';
                                    }
                                    else {
                                        m.uso = 'TOMAR ' + m.cantidad + ' MEDICAMENTO DIARIO POR 1 DIA';
                                    }
                                    if (m.cantidad > m.maxhospix) {
                                        _this.hrzServerService.abrirAdvertencia(null, 'Peligro', "El Medicamento - " + (m.nprod) + " - solo puede pedir un maximo de " + (m.maxhospix) + " cantidades(es)", 'alert-peligro');
                                    }
                                    else {
                                        // this.hrzServerService.abrirAdvertencia(null,
                                        // 	m.nprod,
                                        // 	m.uso,
                                        // 	null,
                                        // 	() => {
                                        _this.ingresarMedicamentoCBAReceta();
                                        // 	}
                                        // );
                                    }
                                });
                            });
                        });
                    }
                    else {
                        _this.alert1("Frecuencia", _this.opcionesMedicamento.cmbFrecuencia, function () {
                            var m = _this.medicamento_seleccionado;
                            m.cantidad = m.Frecuencia;
                            if (m.cantidad > 1) {
                                m.uso = 'TOMAR ' + m.cantidad + ' MEDICAMENTOS DIARIOS POR 1 DIA';
                            }
                            else {
                                m.uso = 'TOMAR ' + m.cantidad + ' MEDICAMENTO DIARIO POR 1 DIA';
                            }
                            // this.hrzServerService.abrirAdvertencia(null,
                            // 	m.nprod,
                            // 	m.uso,
                            // 	null,
                            // 	() => {
                            _this.ingresarMedicamentoCBAReceta();
                            // }
                            // );
                        });
                    }
                }
                console.log("entro1");
                // await (await this.frecuencia(medicamento)).present();
                console.log("entro2");
            });
        });
        console.log("fin");
    };
    RecetaPage.prototype.ingresarMedicamentoCBAReceta = function () {
        var _this = this;
        var m = this.medicamento_seleccionado;
        var r = this.hrzServerService.query({
            metodo: "ingresarMedicamentoCBAReceta",
            idreceta: this.idcomprobante,
            idbodprod: this.medicamento_seleccionado.idbodprod,
            cantidad: m.cantidad,
            dosis: m.dosis || 0,
            idfrec: m.Frecuencia || 0,
            duracion: 1,
            uso: m.uso,
        }, 'serveringbodega');
        r.subscribe(function (r) {
            _this.hrzServerService.abrirMensaje(m.nprod, "Fue agregado correctamente");
            _this.medicamento_seleccionado = null;
            _this.cargarReceta();
        });
    };
    RecetaPage.prototype.ingresarMedicamentoNoCBAReceta = function () {
        var _this = this;
        var m = this.medicamento_seleccionado;
        var r = this.hrzServerService.query({
            metodo: "ingresarMedicamentoNoCBAReceta",
            idreceta: this.idcomprobante,
            idpncb: m.idpncb,
            cantidad: m.cantidad,
            uso: m.uso,
        }, 'serveringbodega');
        r.subscribe(function (r) {
            _this.hrzServerService.abrirMensaje(m.prodncb, "Fue agregado correctamente");
            _this.medicamento_seleccionado = null;
            _this.cargarReceta();
        });
    };
    RecetaPage.prototype.agregarNotaAdicional = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: "Nota Adicional",
                            backdropDismiss: false,
                            cssClass: 'upper',
                            inputs: [
                                { name: 'observacion', value: this.receta.observacion, type: 'text', placeholder: 'Cantidad' },
                            ],
                            buttons: [
                                { text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: function () { } },
                                {
                                    text: 'Ok',
                                    handler: function (d) {
                                        console.log(d);
                                        if (!d.observacion || d.observacion.trim() === '') {
                                            _this.hrzServerService.abrirMensaje("Advertencia", "No se pudo agregar la observacion");
                                            return true;
                                        }
                                        var r = _this.hrzServerService.query({
                                            metodo: "agregarNotaAdicional",
                                            idreceta: _this.idcomprobante,
                                            observacion: d.observacion,
                                        }, 'serveringbodega');
                                        r.subscribe(function (r) {
                                            _this.hrzServerService.abrirMensaje("", "Nota adicional ha sido modificada");
                                            _this.cargarReceta();
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
    RecetaPage.prototype.quitarMedicamentoCBReceta = function (iddetalle) {
        var _this = this;
        var m = this.medicamento_seleccionado;
        var r = this.hrzServerService.query({
            metodo: "quitarMedicamentoReceta",
            iddetalle: iddetalle,
        }, 'serveringbodega');
        r.subscribe(function (r) {
            _this.actualizarCuadroBasico();
        });
    };
    RecetaPage.prototype.quitarMedicamentoNoCBReceta = function (iddetalle) {
        var _this = this;
        var m = this.medicamento_seleccionado;
        var r = this.hrzServerService.query({
            metodo: "quitarMedicamentoReceta",
            iddetalle: iddetalle,
        }, 'serveringbodega');
        r.subscribe(function (r) {
            _this.actualizarNoCuadroBasico();
        });
    };
    RecetaPage.prototype.obtenerDosisMaximaDelMedicamento = function (cb) {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "verDosisMaxima",
            idreceta: this.idcomprobante,
            idprod: this.medicamento_seleccionado.idbodprod,
        }, 'serveringbodega');
        r.subscribe(function (r) {
            if (r[0].estadox == 0) {
                _this.hrzServerService.abrirAdvertencia(null, 'Peligro', r[0].observacionx, 'alert-peligro');
                _this.medicamento_seleccionado = null;
            }
            else {
                if ((r[0].cant_max_diariax > 0) && (r[0].pasa_sin_notix == '1')) {
                    _this.hrzServerService.abrirAdvertencia(null, 'Advertencia', r[0].observacionx, 'alert-advertencia', function () {
                        _this.medicamento_seleccionado = Object.assign(r[0], _this.medicamento_seleccionado);
                        _this.medicamento_seleccionado.maxhospix = r[0].cant_max_diariax;
                        cb();
                    });
                }
                else {
                    _this.medicamento_seleccionado = Object.assign(r[0], _this.medicamento_seleccionado);
                    cb();
                }
                // this.HabiObjetosRecetas();    
            }
        });
    };
    RecetaPage.prototype.obtenerDetallesAdicionalesMedicamento = function (cb) {
        var _this = this;
        var r = this.hrzServerService.query({
            metodo: "HabiObjetosRecetas",
            idprodxbod: this.medicamento_seleccionado.idbodprod,
        }, 'serverform05');
        r.subscribe(function (r) {
            _this.medicamento_seleccionado = Object.assign(r[0], _this.medicamento_seleccionado);
            cb();
        });
    };
    RecetaPage.prototype.obtenerCmbDosisDeMedicamento = function (cb) {
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ComboProdTieneDosis",
            idprod: this.medicamento_seleccionado.idprodx,
        }, 'serverform05');
        r.subscribe(function (r) {
            console.log(r);
            self.opcionesMedicamento.cmbDosis = [];
            r.forEach(function (d) {
                console.log(d);
                self.opcionesMedicamento.cmbDosis.push({
                    name: 'dosis',
                    type: 'radio',
                    label: d["valor"] + "",
                    value: d["multiplo"] + ""
                });
            });
            cb();
        });
    };
    RecetaPage.prototype.confirmarSolicitud = function () {
        if (this.confirmado) {
            this.confirmado();
        }
    };
    RecetaPage.prototype.verAnalisisSeleccionados = function () {
        // setTimeout(
        // ()=>{
        console.log(this);
        this.puntos.slideTo(1);
        this.punto = 1;
        // },5000
        // );
    };
    RecetaPage.prototype.verListaMedicamentosDisponibles = function () {
        this.puntos.slideTo(0);
        this.punto = 0;
    };
    tslib_1.__decorate([
        ViewChild('puntos', { static: false }),
        tslib_1.__metadata("design:type", IonSlides)
    ], RecetaPage.prototype, "puntos", void 0);
    RecetaPage = tslib_1.__decorate([
        Component({
            selector: 'app-receta',
            templateUrl: './receta.page.html',
            styleUrls: ['./receta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], RecetaPage);
    return RecetaPage;
}());
export { RecetaPage };
//# sourceMappingURL=receta.page.js.map