import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { NavController } from '@ionic/angular';
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, hrzServerService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.hrzServerService = hrzServerService;
        this.children = [
        // {
        //   title: 'Bodega',
        //   url: '/menu/bodega',
        //   icon: 'logo-ionic'
        // },
        // {
        //   title: 'Bodega 2',
        //   url: '/menu/bodega',
        //   icon: 'logo-google'
        // },
        ];
        this.pages = [
            {
                title: 'Inicio',
                url: '/menu/main',
                icon: 'home'
            },
            {
                title: 'Pacientes',
                url: '/menu/pacientes',
                icon: 'happy'
            },
            {
                title: 'Modulos',
                children: this.children,
            }
        ];
        this.usuario = hrzServerService.usuario;
        var r = this.hrzServerService.query({
            acc: "getPermisos",
        }, 'app_administracion');
        r.subscribe(function (arrayControles) {
            _this.renderPages(arrayControles);
        });
    }
    MenuPage.prototype.renderPages = function (arrayControles) {
        var _this = this;
        Object.entries(arrayControles).forEach(function (_a) {
            // console.log(key, ctrl)
            var key = _a[0], ctrl = _a[1];
            _this.children.push({
                title: ctrl['nmodulo'],
                url: "/menu/" + ctrl['ncontrol'].toLowerCase(),
                icon: ctrl['icon']
            });
        });
    };
    MenuPage.prototype.ngOnInit = function () {
    };
    MenuPage.prototype.logOut = function () {
        var _this = this;
        this.hrzServerService.query({
            acc: "logOut",
        }, 'app_administracion').subscribe(function (response) {
            if (response == 'OK') {
                _this.navCtrl.navigateForward("login");
            }
        });
    };
    MenuPage = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.page.html',
            styleUrls: ['./menu.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, HrzServerService])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.page.js.map