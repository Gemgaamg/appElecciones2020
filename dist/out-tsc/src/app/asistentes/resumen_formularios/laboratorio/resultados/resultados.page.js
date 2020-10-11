import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HrzServerService } from 'src/app/api/hrz-server.service';
var ResultadosLaboratorioPage = /** @class */ (function () {
    function ResultadosLaboratorioPage(alertController, hrzServerService, modalCtrl) {
        this.alertController = alertController;
        this.hrzServerService = hrzServerService;
        this.modalCtrl = modalCtrl;
        this.det = [];
        this.det_sin_resultado = [];
        this.det_eliminados = [];
        this.historial = [];
    }
    ResultadosLaboratorioPage.prototype.ngOnInit = function () {
        // console.log(this.iddieta)
        this.cargarSolicitud();
    };
    ResultadosLaboratorioPage.prototype.dismiss = function () {
        this.modalCtrl.dismiss();
    };
    ResultadosLaboratorioPage.prototype.trim = function (str) {
        if (str) {
            return str.trim();
        }
        return '';
    };
    ResultadosLaboratorioPage.prototype.cargarSolicitud = function () {
        var _this = this;
        var self = this;
        var r = this.hrzServerService.queryGET({
            metodo: "ver_resultados_por_id",
            idsolicitud: this.idsolicitud,
        }, 'serverlaboratorio');
        r.subscribe(function (s) {
            // console.log(s)
            if (s.resultado.length > 0) {
                _this.paciente = s.resultado[0].pacix;
                _this.det = s.resultado;
                _this.det_sin_resultado = s.examenes_sin_resultados;
                _this.det_eliminados = s.examenes_eliminados;
                _this.historial = s.historial;
            }
        });
    };
    ResultadosLaboratorioPage = tslib_1.__decorate([
        Component({
            selector: 'app-resultados_laboratorio',
            templateUrl: './resultados.page.html',
            styleUrls: ['./resultados.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            HrzServerService,
            ModalController])
    ], ResultadosLaboratorioPage);
    return ResultadosLaboratorioPage;
}());
export { ResultadosLaboratorioPage };
//# sourceMappingURL=resultados.page.js.map