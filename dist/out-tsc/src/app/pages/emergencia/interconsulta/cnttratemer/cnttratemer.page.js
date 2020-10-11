import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonInfiniteScroll, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
var CnttratemerPage = /** @class */ (function () {
    // tiempo: Date;
    function CnttratemerPage(hrzServerService, actionSheetController, router) {
        this.hrzServerService = hrzServerService;
        this.actionSheetController = actionSheetController;
        this.router = router;
        this.inp_paciente = '';
    }
    CnttratemerPage.prototype.ngOnInit = function () {
        this.buscar();
    };
    CnttratemerPage.prototype.ionViewWillEnter = function () {
        this.buscar();
    };
    CnttratemerPage.prototype.inp_paciente_change = function () {
        this.inp_paciente = this.inp_paciente.replace(/[^a-zA-Z0-9%]/gi, '');
    };
    CnttratemerPage.prototype.buscar = function () {
        // console.log("este es el nuevo offset "+ this.offset)
        this.getMisSolicitudesInterconsultasAsignadas(undefined);
    };
    CnttratemerPage.prototype.getMisSolicitudesInterconsultasAsignadas = function (event) {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "getMisSolicitudesInterconsultasAsignadas",
            paciente: this.inp_paciente,
        }, 'serve_hospi_piso');
        r.subscribe(function (interconsultas) {
            if (event) {
                event.target.complete();
            }
            _this.interconsultas = interconsultas;
        });
    };
    CnttratemerPage.prototype.limpiarBuscador = function () {
        this.inp_paciente = "";
        // this.offset = 0;
        this.getMisSolicitudesInterconsultasAsignadas(undefined);
    };
    CnttratemerPage.prototype.cargar10Mas = function (event) {
        this.getMisSolicitudesInterconsultasAsignadas(event);
    };
    CnttratemerPage.prototype.abrirModalConfirmacion = function (interconsulta) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.interconsulta_seleccionada = interconsulta;
                        return [4 /*yield*/, this.actionSheetController.create({
                                header: 'Accion',
                                buttons: [{
                                        text: 'Responder',
                                        //   role: 'destructive',
                                        icon: 'send',
                                        handler: function () {
                                            _this.router.navigate(['/menu/cnttratemer/respuesta_interconsulta'], {
                                                queryParams: _this.interconsulta_seleccionada,
                                            });
                                        }
                                    }, {
                                        text: 'Ver historial clinico',
                                        icon: 'tablet-portrait',
                                        handler: function () {
                                            console.log('Share clicked');
                                        }
                                    }, {
                                        text: 'Cancelar',
                                        icon: 'close',
                                        role: 'cancel',
                                        handler: function () {
                                            console.log('Cancel clicked');
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
    tslib_1.__decorate([
        ViewChild(IonInfiniteScroll, { static: true }),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], CnttratemerPage.prototype, "infiniteScroll", void 0);
    CnttratemerPage = tslib_1.__decorate([
        Component({
            selector: 'app-cnttratemer',
            templateUrl: './cnttratemer.page.html',
            styleUrls: ['./cnttratemer.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ActionSheetController,
            Router])
    ], CnttratemerPage);
    return CnttratemerPage;
}());
export { CnttratemerPage };
//# sourceMappingURL=cnttratemer.page.js.map