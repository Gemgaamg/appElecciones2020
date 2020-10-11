import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var InfoDietaPage = /** @class */ (function () {
    function InfoDietaPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.dieta = {
            detalle: [],
            fcrea: null,
            iddieta: null,
            idpercrea: null,
            ndieta: null,
            orden: null,
        };
    }
    InfoDietaPage.prototype.ngOnInit = function () {
        console.log(this.iddieta);
        this.cargarDieta();
        // this.cargarCie10();
    };
    InfoDietaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    InfoDietaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    InfoDietaPage.prototype.cargarDieta = function () {
        var _this = this;
        console.log(this);
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "infoDieta",
            iddieta: this.iddieta
        }, 'servernutricion');
        r.subscribe(function (s) {
            _this.dieta = s;
        });
    };
    InfoDietaPage = tslib_1.__decorate([
        Component({
            selector: 'app-info_dieta',
            templateUrl: './info_dieta.page.html',
            styleUrls: ['./info_dieta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], InfoDietaPage);
    return InfoDietaPage;
}());
export { InfoDietaPage };
//# sourceMappingURL=info_dieta.page.js.map