import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var Cie10Page = /** @class */ (function () {
    function Cie10Page(hrzServerService, modalCtrl) {
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.cod4_sel = {
            des_cod: ""
        };
        this.cie10s = [];
        this.cie10Busqueda = "";
    }
    Cie10Page.prototype.ngOnInit = function () {
        this.cargarCie10();
    };
    Cie10Page.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    Cie10Page.prototype.enviar = function () {
        console.log("enviar", this.cod4_sel);
        this.modalCtrl.dismiss(this.cod4_sel);
    };
    Cie10Page.prototype.buscar = function () {
        this.cargarCie10();
    };
    Cie10Page.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    Cie10Page.prototype.limpiarBuscador = function () {
        this.cie10Busqueda = "";
        // this.offset = 0;
        this.cargarCie10();
    };
    Cie10Page.prototype.cargarCie10 = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.queryGET({
            metodo: "getCie10s",
            cie10Busqueda: this.cie10Busqueda,
        }, 'serveragendamiento');
        r.subscribe(function (s) {
            if (s[0] != undefined) {
                _this.cie10s = s;
                console.log(_this.cie10s);
            }
            else {
                _this.cie10s = [];
            }
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], Cie10Page.prototype, "idform07", void 0);
    Cie10Page = tslib_1.__decorate([
        Component({
            selector: 'app-cie10',
            templateUrl: './cie10.page.html',
            styleUrls: ['./cie10.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ModalController])
    ], Cie10Page);
    return Cie10Page;
}());
export { Cie10Page };
//# sourceMappingURL=cie10.page.js.map