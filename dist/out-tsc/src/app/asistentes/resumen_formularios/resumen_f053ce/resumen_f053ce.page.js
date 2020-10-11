import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ResumenF053CEPage = /** @class */ (function () {
    function ResumenF053CEPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.form053 = {};
    }
    ResumenF053CEPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarForm053();
    };
    ResumenF053CEPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResumenF053CEPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResumenF053CEPage.prototype.cargarForm053 = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosForm053",
            idf053: this.idform053,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.form053 = s[0];
            console.log(_this.form053);
        });
    };
    ResumenF053CEPage = tslib_1.__decorate([
        Component({
            selector: 'app-resumen_f053ce',
            templateUrl: './resumen_f053ce.page.html',
            styleUrls: ['./resumen_f053ce.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResumenF053CEPage);
    return ResumenF053CEPage;
}());
export { ResumenF053CEPage };
//# sourceMappingURL=resumen_f053ce.page.js.map