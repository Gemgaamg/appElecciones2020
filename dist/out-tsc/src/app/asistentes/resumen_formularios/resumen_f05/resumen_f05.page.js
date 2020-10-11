import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ResumenF05Page = /** @class */ (function () {
    function ResumenF05Page(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.form05 = {};
    }
    ResumenF05Page.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarForm05();
    };
    ResumenF05Page.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResumenF05Page.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResumenF05Page.prototype.cargarForm05 = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosForm05",
            idform05: this.idform05,
        }, 'serverform05');
        r.subscribe(function (s) {
            // console.log(s)
            _this.form05 = s[0];
            console.log(_this.form05);
        });
    };
    ResumenF05Page = tslib_1.__decorate([
        Component({
            selector: 'app-resumen_f05',
            templateUrl: './resumen_f05.page.html',
            styleUrls: ['./resumen_f05.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResumenF05Page);
    return ResumenF05Page;
}());
export { ResumenF05Page };
//# sourceMappingURL=resumen_f05.page.js.map