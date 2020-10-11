import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistorialPorEspecialidad } from './historial_especialidad.page';
import { AtencionesPorEspecialidadPage } from './atenciones_por_especialidad/atenciones_por_especialidad.page';
import { AtencionesPorEspecialidadPageModule } from './atenciones_por_especialidad/atenciones_por_especialidad.module';
var HistorialPorEspecialidadModule = /** @class */ (function () {
    function HistorialPorEspecialidadModule() {
    }
    HistorialPorEspecialidadModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                AtencionesPorEspecialidadPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                AtencionesPorEspecialidadPageModule
            ],
            declarations: [HistorialPorEspecialidad]
        })
    ], HistorialPorEspecialidadModule);
    return HistorialPorEspecialidadModule;
}());
export { HistorialPorEspecialidadModule };
//# sourceMappingURL=historial_especialidad.module.js.map