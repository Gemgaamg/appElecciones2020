import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var NandaPage = /** @class */ (function () {
    function NandaPage(hrzServerService, modalCtrl) {
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.nanda_sel = {
            nombre: ""
        };
        this.nandas = [];
        this.nandaBusqueda = "";
    }
    NandaPage.prototype.ngOnInit = function () {
        this.cargarNanda();
    };
    NandaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    NandaPage.prototype.enviar = function () {
        console.log("enviar", this.nanda_sel);
        this.modalCtrl.dismiss(this.nanda_sel);
    };
    NandaPage.prototype.buscar = function () {
        this.cargarNanda();
    };
    NandaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    NandaPage.prototype.limpiarBuscador = function () {
        this.nandaBusqueda = "";
        // this.offset = 0;
        this.cargarNanda();
    };
    NandaPage.prototype.cargarNanda = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.queryGET({
            metodo: "BuscCodigo_Nanda_movil",
            nandaBusqueda: this.nandaBusqueda,
            idform05: this.idform05
        }, 'serverform05');
        r.subscribe(function (s) {
            if (s[0] != undefined) {
                _this.nandas = s;
                console.log(_this.nandas);
            }
            else {
                _this.nandas = [];
            }
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NandaPage.prototype, "idform07", void 0);
    NandaPage = tslib_1.__decorate([
        Component({
            selector: 'app-nanda',
            templateUrl: './nanda.page.html',
            styleUrls: ['./nanda.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ModalController])
    ], NandaPage);
    return NandaPage;
}());
export { NandaPage };
//# sourceMappingURL=nanda.page.js.map