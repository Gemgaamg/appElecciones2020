import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ResumenRecetaPage = /** @class */ (function () {
    function ResumenRecetaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.receta = {};
    }
    ResumenRecetaPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarReceta();
    };
    ResumenRecetaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResumenRecetaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResumenRecetaPage.prototype.cargarReceta = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosRECETA",
            idreceta: this.idreceta,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.receta = s[0];
            console.log(_this.receta);
        });
    };
    ResumenRecetaPage = tslib_1.__decorate([
        Component({
            selector: 'app-resumen-receta',
            templateUrl: './receta.page.html',
            styleUrls: ['./receta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResumenRecetaPage);
    return ResumenRecetaPage;
}());
export { ResumenRecetaPage };
//# sourceMappingURL=receta.page.js.map