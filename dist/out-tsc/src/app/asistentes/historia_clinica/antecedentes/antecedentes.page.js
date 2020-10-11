import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var AntecedentesPage = /** @class */ (function () {
    function AntecedentesPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.antecedentes = [];
    }
    AntecedentesPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarAntecedentes();
        if (this.tipo_antecedente === 1) {
            this.ntipo_antecedente = 'PERSONALES';
        }
        else {
            this.ntipo_antecedente = 'FAMILIARES';
        }
    };
    AntecedentesPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    AntecedentesPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    AntecedentesPage.prototype.cargarAntecedentes = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.query({
            metodo: "actualizarlISTADOAntecedentes",
            tipo_Ante: this.tipo_antecedente,
            id_paciente: this.idpaciente,
        }, 'server_con_exter');
        r.subscribe(function (s) {
            // console.log(s)
            _this.antecedentes = (s);
            console.log(_this.antecedentes);
        });
    };
    AntecedentesPage = tslib_1.__decorate([
        Component({
            selector: 'app-antecedentes',
            templateUrl: './antecedentes.page.html',
            styleUrls: ['./antecedentes.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], AntecedentesPage);
    return AntecedentesPage;
}());
export { AntecedentesPage };
//# sourceMappingURL=antecedentes.page.js.map