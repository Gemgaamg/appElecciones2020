import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { InfoDietaPage } from '../info_dieta/info_dieta.page';
var DietaPage = /** @class */ (function () {
    function DietaPage(hrzServerService, modalCtrl) {
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.dieta_sel = {
            ndieta: ""
        };
        this.dietas = [];
    }
    DietaPage.prototype.ngOnInit = function () {
        this.cargarDietas();
    };
    DietaPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    DietaPage.prototype.enviar = function () {
        this.modalCtrl.dismiss(this.dieta_sel);
    };
    DietaPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    DietaPage.prototype.verDetalleDieta = function (iddieta) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var self, modal, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: InfoDietaPage,
                                componentProps: {
                                    iddieta: iddieta,
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        console.log(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    DietaPage.prototype.cargarDietas = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "getListaDietas",
        }, 'servernutricion');
        r.subscribe(function (s) {
            if (s[0] != undefined) {
                _this.dietas = s;
                console.log(_this.dietas);
            }
            else {
                _this.dietas = [];
            }
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DietaPage.prototype, "idform07", void 0);
    DietaPage = tslib_1.__decorate([
        Component({
            selector: 'app-dieta',
            templateUrl: './dieta.page.html',
            styleUrls: ['./dieta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService,
            ModalController])
    ], DietaPage);
    return DietaPage;
}());
export { DietaPage };
//# sourceMappingURL=dieta.page.js.map