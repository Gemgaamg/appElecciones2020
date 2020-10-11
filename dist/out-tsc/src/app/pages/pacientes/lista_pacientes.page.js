import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonInfiniteScroll, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
var ListaPacientesPage = /** @class */ (function () {
    function ListaPacientesPage(hrzServerService, actionSheetController, router, modalCtrl, alertController) {
        this.hrzServerService = hrzServerService;
        this.actionSheetController = actionSheetController;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.alertController = alertController;
        this.nombres = '';
        this.apellidos = '';
        this.cedula = '';
        this.numero_archivo = '';
    }
    ListaPacientesPage.prototype.ngOnInit = function () {
        this.buscar();
    };
    ListaPacientesPage.prototype.ionViewWillEnter = function () {
        this.buscar();
    };
    ListaPacientesPage.prototype.srcFiltrosPaciente = function () {
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
    ListaPacientesPage.prototype.abrirFiltros = function () {
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
                                        _this.getPacientes(undefined);
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        _this.nombres = data.nombres;
                                        _this.apellidos = data.apellidos;
                                        _this.cedula = data.cedula;
                                        _this.numero_archivo = data.numero_archivo;
                                        _this.getPacientes(undefined);
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
    ListaPacientesPage.prototype.buscar = function () {
        this.getPacientes(undefined);
    };
    ListaPacientesPage.prototype.getPacientes = function (event) {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            acc: "getPacientes",
            nombres: this.nombres,
            apellidos: this.apellidos,
            cedula: this.cedula,
            numero_archivo: this.numero_archivo
        }, 'app/paciente');
        r.subscribe(function (pacientes_emergencia) {
            if (event) {
                event.target.complete();
            }
            _this.pacientes_emergencia = pacientes_emergencia;
        });
    };
    ListaPacientesPage.prototype.limpiarBuscador = function () {
        this.nombres = "";
        this.apellidos = "";
        this.cedula = "";
        this.numero_archivo = "";
        this.getPacientes(undefined);
    };
    ListaPacientesPage.prototype.cargar10Mas = function (event) {
        this.getPacientes(event);
    };
    ListaPacientesPage.prototype.abrirModalConfirmacion = function (pac) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.paciente_seleccionado = pac;
                this.verHistoriaClinica(this.paciente_seleccionado.idpaciente);
                return [2 /*return*/];
            });
        });
    };
    ListaPacientesPage.prototype.verHistoriaClinica = function (idpaciente) {
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
    ], ListaPacientesPage.prototype, "infiniteScroll", void 0);
    ListaPacientesPage = tslib_1.__decorate([
        Component({
            selector: 'app-lista_pacientes',
            templateUrl: './lista_pacientes.page.html',
            styleUrls: ['./lista_pacientes.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ActionSheetController,
            Router,
            ModalController,
            AlertController])
    ], ListaPacientesPage);
    return ListaPacientesPage;
}());
export { ListaPacientesPage };
//# sourceMappingURL=lista_pacientes.page.js.map