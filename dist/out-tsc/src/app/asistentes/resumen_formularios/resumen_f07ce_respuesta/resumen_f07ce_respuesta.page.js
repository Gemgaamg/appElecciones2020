import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ResumenF07CERespuestaPage = /** @class */ (function () {
    function ResumenF07CERespuestaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.form07 = {};
    }
    ResumenF07CERespuestaPage.prototype.ngOnInit = function () {
        this.cargarForm07();
    };
    ResumenF07CERespuestaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResumenF07CERespuestaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResumenF07CERespuestaPage.prototype.cargarForm07 = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosRESPU_Interc",
            idf007: this.idform07,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.form07 = s[0];
            console.log(_this.form07);
        });
    };
    ResumenF07CERespuestaPage = tslib_1.__decorate([
        Component({
            selector: 'app-resumen_f07ce_respuesta',
            templateUrl: './resumen_f07ce_respuesta.page.html',
            styleUrls: ['./resumen_f07ce_respuesta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResumenF07CERespuestaPage);
    return ResumenF07CERespuestaPage;
}());
export { ResumenF07CERespuestaPage };
//# sourceMappingURL=resumen_f07ce_respuesta.page.js.map