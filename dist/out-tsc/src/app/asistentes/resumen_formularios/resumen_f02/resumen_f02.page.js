import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ResumenF02Page = /** @class */ (function () {
    function ResumenF02Page(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.form02 = {};
    }
    ResumenF02Page.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarForm02();
    };
    ResumenF02Page.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResumenF02Page.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResumenF02Page.prototype.cargarForm02 = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosForm002best",
            idf02: this.idform02,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.form02 = s[0];
            console.log(_this.form02);
        });
    };
    ResumenF02Page = tslib_1.__decorate([
        Component({
            selector: 'app-resumen_f02',
            templateUrl: './resumen_f02.page.html',
            styleUrls: ['./resumen_f02.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResumenF02Page);
    return ResumenF02Page;
}());
export { ResumenF02Page };
//# sourceMappingURL=resumen_f02.page.js.map