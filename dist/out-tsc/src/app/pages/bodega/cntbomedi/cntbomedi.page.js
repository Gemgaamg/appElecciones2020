import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { HrzServerService } from 'src/app/api/hrz-server.service';
import { IonContent } from '@ionic/angular';
var CntbomediPage = /** @class */ (function () {
    function CntbomediPage(hrzServerService) {
        this.hrzServerService = hrzServerService;
        this.nombre_producto = '';
        this.offset = 0;
        this.cargando = false;
    }
    CntbomediPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.tiempo = new Date();
        this.content.ionScroll.subscribe(function (event) {
            event.srcElement.getScrollElement().then(function (element) {
                if (element.scrollHeight - (element.scrollTop + event.srcElement.scrollHeight) < 50) {
                    // element.scrollTop = element.scrollTop-5;
                    _this.cargar10Mas();
                }
            });
        });
    };
    CntbomediPage.prototype.ngOnInit = function () {
        // this.content.
    };
    CntbomediPage.prototype.nombre_producto_change = function () {
        this.nombre_producto = this.nombre_producto.replace(/[^a-zA-Z0-9%]/gi, '');
    };
    CntbomediPage.prototype.buscarNuevoProducto = function () {
        this.content.scrollToTop();
        this.offset = 0;
        console.log("este es el nuevo offset " + this.offset);
        this.buscarProductos();
    };
    CntbomediPage.prototype.buscarProductos = function () {
        var _this = this;
        this.cargando = true;
        var self = this;
        var r = this.hrzServerService.query({
            acc: "get_productos_disponibles_medicamentos",
            nombre_producto: this.nombre_producto,
            offset: this.offset,
        }, 'app/bodega');
        r.subscribe(function (productos) {
            _this.cargando = false;
            if (self.offset == 0) {
                _this.medicamentos = productos;
                console.log(productos);
                console.log("carga inicial");
            }
            else {
                _this.medicamentos = _this.medicamentos.concat(productos);
                console.log("carga numero" + _this.offset);
            }
        });
    };
    CntbomediPage.prototype.limpiarBuscador = function () {
        this.nombre_producto = "";
        this.offset = 0;
        this.buscarProductos();
        this.content.scrollToTop();
    };
    CntbomediPage.prototype.cargar10Mas = function () {
        if (this.tiempo.getSeconds() != new Date().getSeconds()) {
            this.tiempo = new Date();
            this.offset = this.offset + 1;
            this.buscarProductos();
        }
    };
    tslib_1.__decorate([
        ViewChild('contenedor', { static: true }),
        tslib_1.__metadata("design:type", IonContent)
    ], CntbomediPage.prototype, "content", void 0);
    CntbomediPage = tslib_1.__decorate([
        Component({
            selector: 'app-cntbomedi',
            templateUrl: './cntbomedi.page.html',
            styleUrls: ['./cntbomedi.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [HrzServerService])
    ], CntbomediPage);
    return CntbomediPage;
}());
export { CntbomediPage };
//# sourceMappingURL=cntbomedi.page.js.map