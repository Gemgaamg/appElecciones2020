import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HrzServerService } from '../api/hrz-server.service';
import { NavController, Platform } from '@ionic/angular';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, hrzServerService, platform) {
        this.navCtrl = navCtrl;
        this.hrzServerService = hrzServerService;
        this.platform = platform;
        this.platform.backButton.subscribeWithPriority(0, function () {
            navigator['app'].exitApp();
        });
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        var r = this.hrzServerService.getEstado();
        r.subscribe(function (response) {
            console.log(response);
            if (response === 'CONECTADO') {
                _this.navCtrl.navigateForward("menu/main");
            }
        });
    };
    LoginPage.prototype.logIn = function (cedula, clave, event) {
        var _this = this;
        var r = this.hrzServerService.logIn(cedula, clave);
        r.subscribe(function (response) {
            console.log(response);
            if (response[0]['estado'] === 'OK') {
                _this.navCtrl.navigateForward("menu/main");
            }
        });
    };
    LoginPage.prototype.getEstado = function () {
        var _this = this;
        this.hrzServerService.query({
            acc: "estado",
        }, 'app_administracion').subscribe(function (response) {
            // console.log(`${response}`);
            _this.estado = response;
            // return response;
        });
    };
    LoginPage.prototype.logOut = function () {
        this.hrzServerService.query({
            acc: "logOut",
        }, 'app_administracion').subscribe(function (response) {
            console.log("" + response);
        });
    };
    LoginPage.prototype.pruebaObjeto = function () {
        this.hrzServerService.query({
            acc: "pruebaObjeto",
        }, 'app_administracion').subscribe(function (response) {
            console.log(response);
        });
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: 'login.page.html',
            styleUrls: ['login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, HrzServerService, Platform])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map