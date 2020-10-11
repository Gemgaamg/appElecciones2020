import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { HrzServerService } from './api/hrz-server.service';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, hrzServerService
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar
    ) {
        this.platform = platform;
        this.hrzServerService = hrzServerService;
        this.initializeApp();
    }
    // initializeApp() {
    //   this.platform.ready().then(() => {
    //     this.statusBar.styleDefault();
    //     // this.splashScreen.hide();
    //   });
    // }
    AppComponent.prototype.initializeApp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var SplashScreen, StatusBar, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        SplashScreen = Plugins.SplashScreen, StatusBar = Plugins.StatusBar;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, SplashScreen.hide()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, StatusBar.setStyle({ style: StatusBarStyle.Light })];
                    case 3:
                        _a.sent();
                        if (this.platform.is('android')) {
                            StatusBar.setBackgroundColor({ color: '#CDCDCD' });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log('This is normal in a browser', err_1);
                        return [3 /*break*/, 5];
                    case 5:
                        this.platform.resume.subscribe(function () {
                            _this.hrzServerService.getEstado();
                            console.log('****resumen aplicion****');
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            HrzServerService
            // private splashScreen: SplashScreen,
            // private statusBar: StatusBar
        ])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map