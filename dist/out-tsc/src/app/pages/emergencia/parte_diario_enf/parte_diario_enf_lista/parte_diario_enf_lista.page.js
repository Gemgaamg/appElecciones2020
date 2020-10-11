import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonInfiniteScroll, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
var ParteDiarioEnfListaPage = /** @class */ (function () {
    // tiempo: Date;
    function ParteDiarioEnfListaPage(hrzServerService, actionSheetController, router, modalCtrl, alertController) {
        this.hrzServerService = hrzServerService;
        this.actionSheetController = actionSheetController;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.alertController = alertController;
        this.primer_nombre = '';
        this.segundo_nombre = '';
        this.primer_apellido = '';
        this.segundo_apellido = '';
        this.cedula = '';
        this.numero_archivo = '';
        this.cmbAreas = [];
        this.filtros = {
            idarea: '-',
            texto: 'Todos'
        };
    }
    ParteDiarioEnfListaPage.prototype.ngOnInit = function () {
        this.buscar();
    };
    ParteDiarioEnfListaPage.prototype.ionViewWillEnter = function () {
        this.buscar();
        this.obtenerAreas();
    };
    ParteDiarioEnfListaPage.prototype.obtenerAreas = function () {
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "CargAreaToEvoluCMB",
        }, 'serverform05');
        r.subscribe(function (r) {
            self.cmbAreas = [];
            r.forEach(function (d) {
                console.log(d);
                self.cmbAreas.push({
                    name: 'idarea',
                    type: 'radio',
                    label: d["narea"] + "",
                    value: {
                        idarea: d["idarea"],
                        texto: d["narea"],
                    }
                });
            });
        });
    };
    ParteDiarioEnfListaPage.prototype.srcFiltrosPaciente = function () {
        var f = '';
        if (this.primer_apellido !== undefined && this.primer_apellido.trim() !== '') {
            f = 'Apellidos: ' + this.primer_apellido + ' ';
            if (this.segundo_apellido !== undefined && this.segundo_apellido.trim() !== '') {
                f = f + ' ' + this.segundo_apellido + ' ';
            }
        }
        else {
            if (this.segundo_apellido !== undefined && this.segundo_apellido.trim() !== '') {
                f = 'Apellidos: ' + this.segundo_apellido + ' ';
            }
        }
        if (this.primer_nombre !== undefined && this.primer_nombre.trim() !== '') {
            f = f + 'Nombre: ' + this.primer_nombre + ' ';
            if (this.segundo_nombre !== undefined && this.segundo_nombre.trim() !== '') {
                f = f + ' ' + this.segundo_nombre + ' ';
            }
        }
        else {
            if (this.segundo_nombre !== undefined && this.segundo_nombre.trim() !== '') {
                f = f + 'Nombre: ' + this.segundo_nombre + ' ';
            }
        }
        if (this.cedula !== undefined && this.cedula.trim() !== '') {
            f = f + 'Cedula: ' + this.cedula + '\t';
        }
        if (this.numero_archivo !== undefined && this.numero_archivo.trim() !== '') {
            f = f + 'No. archivo: ' + this.numero_archivo + '\t';
        }
        return f;
    };
    ParteDiarioEnfListaPage.prototype.abrirFiltros = function () {
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
                                    name: 'primer_apellido',
                                    type: 'text',
                                    placeholder: 'Primer apellido',
                                    value: this.primer_apellido
                                },
                                {
                                    name: 'segundo_apellido',
                                    type: 'text',
                                    placeholder: 'Segundo apellido',
                                    value: this.segundo_apellido
                                },
                                {
                                    name: 'primer_nombre',
                                    type: 'text',
                                    placeholder: 'Primer nombre',
                                    value: this.primer_nombre
                                },
                                {
                                    name: 'segundo_nombre',
                                    type: 'text',
                                    placeholder: 'Segundo nombre',
                                    value: this.segundo_nombre
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
                                        _this.primer_nombre = '';
                                        _this.segundo_nombre = '';
                                        _this.primer_apellido = '';
                                        _this.segundo_apellido = '';
                                        _this.cedula = '';
                                        _this.numero_archivo = '';
                                        _this.getPacientesEmergencia(undefined);
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        _this.primer_nombre = data.primer_nombre;
                                        _this.segundo_nombre = data.segundo_nombre;
                                        _this.primer_apellido = data.primer_apellido;
                                        _this.segundo_apellido = data.segundo_apellido;
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
    ParteDiarioEnfListaPage.prototype.buscar = function () {
        this.getPacientesEmergencia(undefined);
    };
    ParteDiarioEnfListaPage.prototype.getPacientesEmergencia = function (event) {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "BusPacieNomToEvolEmergencia",
            archivo: this.numero_archivo,
            cedula: this.cedula,
            primer_apellido: this.primer_apellido,
            segundo_apellido: this.segundo_apellido,
            primer_nombre: this.primer_nombre,
            segundo_nombre: this.segundo_nombre,
            idarea: this.filtros.idarea,
        }, 'serverform05');
        r.subscribe(function (pacientes_emergencia) {
            if (event) {
                event.target.complete();
            }
            _this.pacientes_emergencia = pacientes_emergencia;
        });
    };
    ParteDiarioEnfListaPage.prototype.limpiarBuscador = function () {
        this.primer_nombre = "";
        this.segundo_nombre = "";
        this.primer_apellido = "";
        this.segundo_apellido = "";
        this.cedula = "";
        this.numero_archivo = "";
        this.getPacientesEmergencia(undefined);
    };
    ParteDiarioEnfListaPage.prototype.cargar10Mas = function (event) {
        this.getPacientesEmergencia(event);
    };
    ParteDiarioEnfListaPage.prototype.abrirModalConfirmacion = function (pac) {
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
                                            _this.router.navigate(['/menu/cntenferm/parte_diario_enf'], {
                                                queryParams: { idpre: _this.paciente_seleccionado.idprex },
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
    ParteDiarioEnfListaPage.prototype.abrirFiltroAreas = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Filtro de búsqueda',
                            subHeader: 'Areas Emergencia',
                            inputs: this.cmbAreas,
                            // [
                            // 	{
                            // 		name: 'todos',
                            // 		type: 'radio',
                            // 		label: 'Todos',
                            // 		value: {
                            // 			referir:-1,
                            // 			cate:-1,
                            // 			categoria:'todos',
                            // 			texto:'Todos'
                            // 		},
                            // 		checked: this.filtros.categoria=='todos'
                            // 	},
                            // 	{
                            // 		name: 'triaje',
                            // 		type: 'radio',
                            // 		label: 'Triaje Pediatrico',
                            // 		value: {
                            // 			referir:0,
                            // 			cate:1,
                            // 			categoria:'triaje',
                            // 			texto:'Triaje Pediatrico'
                            // 		},
                            // 		checked: this.filtros.categoria=='triaje'
                            // 	},
                            // 	{
                            // 		name: 'pediatria',
                            // 		type: 'radio',
                            // 		label: 'Pediatria',
                            // 		value: {
                            // 			referir:6,
                            // 			cate:1,
                            // 			categoria:'pediatria',
                            // 			texto:'Pediatria'
                            // 		},
                            // 		checked: this.filtros.categoria=='pediatria'
                            // 	},
                            // 	{
                            // 		name: 'observacion',
                            // 		type: 'radio',
                            // 		label: 'Observacion',
                            // 		value: {
                            // 			referir: 7,
                            // 			cate:-1,
                            // 			categoria:'observacion',
                            // 			texto:'Observacion'
                            // 		},
                            // 		checked: this.filtros.categoria=='observacion'
                            // 	},
                            // 	{
                            // 		name: 'ucim',
                            // 		type: 'radio',
                            // 		label: 'UCIM',
                            // 		value: {
                            // 			referir: 1,
                            // 			cate:-1,
                            // 			categoria:'ucim',
                            // 			texto:'UCIM'
                            // 		},
                            // 		checked: this.filtros.categoria=='ucim'
                            // 	},
                            // 	{
                            // 		name: 'shock',
                            // 		type: 'radio',
                            // 		label: 'SHOCK',
                            // 		value: {
                            // 			referir: 8,
                            // 			cate:-1,
                            // 			categoria:'shock',
                            // 			texto:'SHOCK'
                            // 		},
                            // 		checked: this.filtros.categoria=='shock'
                            // 	},
                            // 	{
                            // 		name: 'polivalente',
                            // 		type: 'radio',
                            // 		label: 'Polivalente',
                            // 		value: {
                            // 			referir:2,
                            // 			cate:-1,
                            // 			categoria:'polivalente',
                            // 			texto:'Polivalente'
                            // 		},
                            // 		checked: this.filtros.categoria=='polivalente'
                            // 	},
                            // 	{
                            // 		name: 'ginecologia',
                            // 		type: 'radio',
                            // 		label: 'Ginecologia',
                            // 		value: {
                            // 			referir:3,
                            // 			cate:-1,
                            // 			categoria:'ginecologia',
                            // 			texto:'Ginecologia'
                            // 		},
                            // 		checked: this.filtros.categoria=='ginecologia'
                            // 	},
                            // 	{
                            // 		name: 'cirugia',
                            // 		type: 'radio',
                            // 		label: 'Cirugia',
                            // 		value: {
                            // 			referir:4,
                            // 			cate:-1,
                            // 			categoria:'cirugia',
                            // 			texto:'Cirugia'
                            // 		},
                            // 		checked: this.filtros.categoria=='cirugia'
                            // 	},
                            // 	{
                            // 		name: 'observacion',
                            // 		type: 'radio',
                            // 		label: 'Observacion',
                            // 		value: {
                            // 			referir:5,
                            // 			cate:-1,
                            // 			categoria:'observacion',
                            // 			texto:'Observacion'
                            // 		},
                            // 		checked: this.filtros.categoria=='observacion'
                            // 	},
                            // 	{
                            // 		name: 'triaje_verde',
                            // 		type: 'radio',
                            // 		label: 'Triaje verde',
                            // 		value: {
                            // 			referir:0,
                            // 			cate:5,
                            // 			categoria:'triaje_verde',
                            // 			texto:'Triaje verde'
                            // 		},
                            // 		checked: this.filtros.categoria=='triaje_verde'
                            // 	},
                            // 	{
                            // 		name: 'triaje_azul',
                            // 		type: 'radio',
                            // 		label: 'Triaje azul',
                            // 		value: {
                            // 			referir:0,
                            // 			cate:6,
                            // 			categoria:'triaje_azul',
                            // 			texto:'Triaje azul'
                            // 		},
                            // 		checked: this.filtros.categoria=='triaje_azul'
                            // 	}
                            // ],
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
                                        console.log(data);
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
    ParteDiarioEnfListaPage.prototype.verHistoriaClinica = function (idpaciente) {
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
    ], ParteDiarioEnfListaPage.prototype, "infiniteScroll", void 0);
    ParteDiarioEnfListaPage = tslib_1.__decorate([
        Component({
            selector: 'app-parte_diario_enf_lista',
            templateUrl: './parte_diario_enf_lista.page.html',
            styleUrls: ['./parte_diario_enf_lista.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ActionSheetController,
            Router,
            ModalController,
            AlertController])
    ], ParteDiarioEnfListaPage);
    return ParteDiarioEnfListaPage;
}());
export { ParteDiarioEnfListaPage };
//# sourceMappingURL=parte_diario_enf_lista.page.js.map