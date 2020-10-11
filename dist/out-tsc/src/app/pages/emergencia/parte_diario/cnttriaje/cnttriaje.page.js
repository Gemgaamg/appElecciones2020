import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonInfiniteScroll, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
var CnttriajePage = /** @class */ (function () {
    // tiempo: Date;
    function CnttriajePage(hrzServerService, actionSheetController, router, modalCtrl, alertController) {
        this.hrzServerService = hrzServerService;
        this.actionSheetController = actionSheetController;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.alertController = alertController;
        this.nombres = '';
        this.apellidos = '';
        this.cedula = '';
        this.numero_archivo = '';
        this.filtros = {
            referir: -1,
            cate: -1,
            categoria: 'todos',
            texto: 'Todos'
        };
    }
    CnttriajePage.prototype.ngOnInit = function () {
        this.buscar();
    };
    CnttriajePage.prototype.ionViewWillEnter = function () {
        this.buscar();
    };
    CnttriajePage.prototype.srcFiltrosPaciente = function () {
        var f = '';
        if (this.apellidos !== undefined && this.apellidos.trim() !== '') {
            f = 'Apellidos: ' + this.apellidos + '\t';
        }
        if (this.nombres !== undefined && this.nombres.trim() !== '') {
            f = f + 'Nombres: ' + this.nombres + '\t';
        }
        if (this.cedula !== undefined && this.cedula.trim() !== '') {
            f = f + 'Cedula: ' + this.cedula + '\t';
        }
        if (this.numero_archivo !== undefined && this.numero_archivo.trim() !== '') {
            f = f + 'No. archivo: ' + this.numero_archivo + '\t';
        }
        return f;
    };
    CnttriajePage.prototype.abrirFiltros = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Filtro de paciente',
                            cssClass: 'upper',
                            inputs: [
                                {
                                    name: 'apellidos',
                                    type: 'text',
                                    placeholder: 'Apellidos',
                                    value: this.apellidos
                                },
                                {
                                    name: 'nombres',
                                    type: 'text',
                                    placeholder: 'Nombres',
                                    value: this.nombres
                                },
                                {
                                    name: 'cedula',
                                    type: 'text',
                                    placeholder: 'Cedula',
                                    value: this.cedula
                                },
                                {
                                    name: 'numero_archivo',
                                    type: 'number',
                                    placeholder: 'Numero de archivo',
                                    value: this.numero_archivo
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'btn-danger',
                                    handler: function () {
                                    }
                                }, {
                                    text: 'Limpiar',
                                    cssClass: 'btn-warning',
                                    handler: function () {
                                        _this.nombres = '';
                                        _this.apellidos = '';
                                        _this.cedula = '';
                                        _this.numero_archivo = '';
                                        _this.getPacientesEmergencia(undefined);
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        _this.nombres = data.nombres;
                                        _this.apellidos = data.apellidos;
                                        _this.cedula = data.cedula;
                                        _this.numero_archivo = data.numero_archivo;
                                        _this.getPacientesEmergencia(undefined);
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
    CnttriajePage.prototype.buscar = function () {
        this.getPacientesEmergencia(undefined);
    };
    CnttriajePage.prototype.getPacientesEmergencia = function (event) {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "getPacientesEmergencia",
            nombres: this.nombres,
            apellidos: this.apellidos,
            cedula: this.cedula,
            numero_archivo: this.numero_archivo,
            referir: this.filtros.referir,
            cate: this.filtros.cate,
        }, 'servetriaje');
        r.subscribe(function (pacientes_emergencia) {
            if (event) {
                event.target.complete();
            }
            _this.pacientes_emergencia = pacientes_emergencia;
        });
    };
    CnttriajePage.prototype.limpiarBuscador = function () {
        this.nombres = "";
        this.apellidos = "";
        this.cedula = "";
        this.numero_archivo = "";
        this.getPacientesEmergencia(undefined);
    };
    CnttriajePage.prototype.cargar10Mas = function (event) {
        this.getPacientesEmergencia(event);
    };
    CnttriajePage.prototype.abrirModalConfirmacion = function (pac) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.paciente_seleccionado = pac;
                        return [4 /*yield*/, this.actionSheetController.create({
                                header: 'Accion',
                                buttons: [{
                                        text: 'Abrir parte diario',
                                        //   role: 'destructive',
                                        icon: 'send',
                                        handler: function () {
                                            _this.router.navigate(['/menu/cnttriaje/parte_diario'], {
                                                queryParams: _this.paciente_seleccionado,
                                            });
                                        }
                                    }, {
                                        text: 'Ver historial clinico',
                                        icon: 'tablet-portrait',
                                        handler: function () {
                                            _this.verHistoriaClinica(_this.paciente_seleccionado.idpaciente);
                                        }
                                    }, {
                                        text: 'Cancelar',
                                        icon: 'close',
                                        role: 'cancel',
                                        handler: function () {
                                        }
                                    }]
                            })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CnttriajePage.prototype.abrirFiltroAreas = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Filtro de búsqueda',
                            subHeader: 'Areas Emergencia',
                            inputs: [
                                {
                                    name: 'todos',
                                    type: 'radio',
                                    label: 'Todos',
                                    value: {
                                        referir: -1,
                                        cate: -1,
                                        categoria: 'todos',
                                        texto: 'Todos'
                                    },
                                    checked: this.filtros.categoria == 'todos'
                                },
                                {
                                    name: 'triaje',
                                    type: 'radio',
                                    label: 'Triaje Pediatrico',
                                    value: {
                                        referir: 0,
                                        cate: 1,
                                        categoria: 'triaje',
                                        texto: 'Triaje Pediatrico'
                                    },
                                    checked: this.filtros.categoria == 'triaje'
                                },
                                {
                                    name: 'pediatria',
                                    type: 'radio',
                                    label: 'Pediatria',
                                    value: {
                                        referir: 6,
                                        cate: 1,
                                        categoria: 'pediatria',
                                        texto: 'Pediatria'
                                    },
                                    checked: this.filtros.categoria == 'pediatria'
                                },
                                {
                                    name: 'observacion',
                                    type: 'radio',
                                    label: 'Observacion',
                                    value: {
                                        referir: 7,
                                        cate: -1,
                                        categoria: 'observacion',
                                        texto: 'Observacion'
                                    },
                                    checked: this.filtros.categoria == 'observacion'
                                },
                                {
                                    name: 'ucim',
                                    type: 'radio',
                                    label: 'UCIM',
                                    value: {
                                        referir: 1,
                                        cate: -1,
                                        categoria: 'ucim',
                                        texto: 'UCIM'
                                    },
                                    checked: this.filtros.categoria == 'ucim'
                                },
                                {
                                    name: 'shock',
                                    type: 'radio',
                                    label: 'SHOCK',
                                    value: {
                                        referir: 8,
                                        cate: -1,
                                        categoria: 'shock',
                                        texto: 'SHOCK'
                                    },
                                    checked: this.filtros.categoria == 'shock'
                                },
                                {
                                    name: 'polivalente',
                                    type: 'radio',
                                    label: 'Polivalente',
                                    value: {
                                        referir: 2,
                                        cate: -1,
                                        categoria: 'polivalente',
                                        texto: 'Polivalente'
                                    },
                                    checked: this.filtros.categoria == 'polivalente'
                                },
                                {
                                    name: 'ginecologia',
                                    type: 'radio',
                                    label: 'Ginecologia',
                                    value: {
                                        referir: 3,
                                        cate: -1,
                                        categoria: 'ginecologia',
                                        texto: 'Ginecologia'
                                    },
                                    checked: this.filtros.categoria == 'ginecologia'
                                },
                                {
                                    name: 'cirugia',
                                    type: 'radio',
                                    label: 'Cirugia',
                                    value: {
                                        referir: 4,
                                        cate: -1,
                                        categoria: 'cirugia',
                                        texto: 'Cirugia'
                                    },
                                    checked: this.filtros.categoria == 'cirugia'
                                },
                                {
                                    name: 'observacion',
                                    type: 'radio',
                                    label: 'Observacion',
                                    value: {
                                        referir: 5,
                                        cate: -1,
                                        categoria: 'observacion',
                                        texto: 'Observacion'
                                    },
                                    checked: this.filtros.categoria == 'observacion'
                                },
                                {
                                    name: 'triaje_verde',
                                    type: 'radio',
                                    label: 'Triaje verde',
                                    value: {
                                        referir: 0,
                                        cate: 5,
                                        categoria: 'triaje_verde',
                                        texto: 'Triaje verde'
                                    },
                                    checked: this.filtros.categoria == 'triaje_verde'
                                },
                                {
                                    name: 'triaje_azul',
                                    type: 'radio',
                                    label: 'Triaje azul',
                                    value: {
                                        referir: 0,
                                        cate: 6,
                                        categoria: 'triaje_azul',
                                        texto: 'Triaje azul'
                                    },
                                    checked: this.filtros.categoria == 'triaje_azul'
                                }
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
                                    text: 'Ok',
                                    handler: function (data) {
                                        _this.filtros = data;
                                        _this.limpiarBuscador();
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
    CnttriajePage.prototype.verHistoriaClinica = function (idpaciente) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: HistoriaClinicaPage,
                                componentProps: {
                                    idpaciente: idpaciente,
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
        ViewChild(IonInfiniteScroll, { static: true }),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], CnttriajePage.prototype, "infiniteScroll", void 0);
    CnttriajePage = tslib_1.__decorate([
        Component({
            selector: 'app-cnttriaje',
            templateUrl: './cnttriaje.page.html',
            styleUrls: ['./cnttriaje.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ActionSheetController,
            Router,
            ModalController,
            AlertController])
    ], CnttriajePage);
    return CnttriajePage;
}());
export { CnttriajePage };
//# sourceMappingURL=cnttriaje.page.js.map