import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { share } from 'rxjs/operators';
import { APIUrl } from 'src/environments/environment';
// import { ServerResponse } from 'http';
var HrzServerService = /** @class */ (function () {
    function HrzServerService(http, navCtrl, loadingController, alertController, toastController) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.toastController = toastController;
        this.url_server = APIUrl;
        this.isLoggedIn = false;
        this.loadingAbierto = false;
        this.usuario = new Usuario();
    }
    // export ANDROID_HOME=/home/superuser/Android/Sdk
    // export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
    // ionic cordova run android --device
    HrzServerService.prototype.logIn = function (cedula, clave) {
        var _this = this;
        var body = {
            cedula: cedula,
            clave: clave,
        };
        var httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            params: body
        };
        var requesUrl = this.url_server + "/app_checklogin";
        console.log(requesUrl);
        this.abrirLoading();
        var respObsv = this.http.post(requesUrl, {}, httpOptions).pipe(share());
        // this.abrirLoading()
        respObsv.subscribe(function (response) {
            _this.cerrarLoading();
            // this.cerrarLoading()
            if (response[0]['estado'] === 'OK') {
                _this.isLoggedIn = true;
                _this.usuario.nombre = response[0]['nombre_usuario'].toLowerCase();
                _this.usuario.mail = response[0]['mail'];
                _this.usuario.cedula = response[0]['ci'];
                _this.usuario.idper = response[0]['idper'];
            }
            else {
                _this.abrirAdvertencia('Advertencia', 'No se pudo iniciar la sesion', response[0]['estado']);
            }
        }, function (error) {
            // this.cerrarLoading()
            _this.cerrarLoading();
            _this.abrirAdvertencia('Advertencia', 'No se pudo iniciar la sesion', 'Error desconocido, asegurese de estar conectado a la red del Hospital Rodriguez Zambrano');
            console.log(error);
        }, function () {
            _this.cerrarLoading();
        });
        return respObsv;
    };
    HrzServerService.prototype.getEstado = function () {
        var _this = this;
        var body = {
            acc: "estado",
        };
        var httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            params: body
        };
        var requesUrl = this.url_server + "/app_administracion";
        console.log(requesUrl);
        // return this.http.post(requesUrl,{},httpOptions);
        var respObsv = this.http.post(requesUrl, {}, httpOptions).pipe(share());
        respObsv.subscribe(function (response) {
            console.log(response);
            if (response === 'DESCONECTADO') {
                _this.navCtrl.navigateForward("login");
                _this.isLoggedIn = false;
            }
            if (response === 'CONECTADO') {
                _this.isLoggedIn = true;
            }
        });
        return respObsv;
    };
    HrzServerService.prototype.query = function (body, servlet) {
        var _this = this;
        var httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            params: body
        };
        var requesUrl = this.url_server + "/" + servlet;
        // this.abrirLoading()
        this.abrirLoading();
        var respObsv = this.http.post(requesUrl, {}, httpOptions).pipe(share());
        respObsv.subscribe(function (resp) {
            _this.cerrarLoading();
            if (resp === 'DESCONECTADO') {
                _this.navCtrl.navigateForward("login");
                _this.isLoggedIn = false;
            }
        }, function (error) {
            console.log(error);
            _this.cerrarLoading();
        }, function () {
            _this.cerrarLoading();
        });
        return respObsv;
    };
    HrzServerService.prototype.queryGET = function (body, servlet) {
        var _this = this;
        var httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            withCredentials: true,
            params: body
        };
        var requesUrl = this.url_server + "/" + servlet;
        // this.abrirLoading()
        this.abrirLoading();
        var respObsv = this.http.get(requesUrl, httpOptions).pipe(share());
        respObsv.subscribe(function (resp) {
            _this.cerrarLoading();
            if (resp === 'DESCONECTADO') {
                _this.navCtrl.navigateForward("login");
                _this.isLoggedIn = false;
            }
        }, function (error) {
            console.log(error);
            _this.cerrarLoading();
        }, function () {
            _this.cerrarLoading();
        });
        return respObsv;
    };
    HrzServerService.prototype.authenticated = function () {
        return this.isLoggedIn;
    };
    HrzServerService.prototype.abrirAdvertencia = function (header, subHeader, message, cssClass, callback) {
        if (cssClass == null) {
            cssClass = '';
        }
        var alert = this.alertController.create({
            header: header,
            subHeader: subHeader,
            message: message,
            backdropDismiss: false,
            cssClass: cssClass,
            buttons: [
                {
                    text: 'Ok',
                    handler: function (d) {
                        if (callback) {
                            callback();
                        }
                    }
                }
            ]
        });
        alert.then(function (a) { a.present(); });
    };
    HrzServerService.prototype.abrirMensaje = function (titulo, mensaje) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            header: titulo,
                            message: mensaje,
                            position: 'bottom',
                            duration: 2000,
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    HrzServerService.prototype.abrirLoading = function () {
        if (this.loadingAbierto) {
            return;
        }
        this.loadingAbierto = true;
        this.loading = this.loadingController.create({
            message: 'Cargando ...',
        });
        this.loading.then(function (l) {
            l.present();
        });
    };
    HrzServerService.prototype.cerrarLoading = function () {
        try {
            if (!this.loadingAbierto) {
                return;
            }
            this.loading.then(function (l) {
                l.dismiss();
            });
            this.loadingAbierto = false;
        }
        catch (e) {
            console.log(e);
        }
    };
    HrzServerService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            NavController,
            LoadingController,
            AlertController,
            ToastController])
    ], HrzServerService);
    return HrzServerService;
}());
export { HrzServerService };
//# sourceMappingURL=hrz-server.service.js.map