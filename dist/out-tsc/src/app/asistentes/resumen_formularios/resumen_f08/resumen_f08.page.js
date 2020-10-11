import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ResumenF08Page = /** @class */ (function () {
    function ResumenF08Page(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.form08 = {};
    }
    ResumenF08Page.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarForm08();
    };
    ResumenF08Page.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResumenF08Page.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResumenF08Page.prototype.cargarForm08 = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "ObtenerDatosForm08",
            idform08: this.idform08,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.form08 = s[0];
            console.log(_this.form08);
        });
    };
    ResumenF08Page = tslib_1.__decorate([
        Component({
            selector: 'app-resumen_f08',
            templateUrl: './resumen_f08.page.html',
            styleUrls: ['./resumen_f08.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResumenF08Page);
    return ResumenF08Page;
}());
export { ResumenF08Page };
//# sourceMappingURL=resumen_f08.page.js.map