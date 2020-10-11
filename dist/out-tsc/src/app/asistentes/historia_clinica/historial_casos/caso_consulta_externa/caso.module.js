import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CasoConsultaExternaPage } from './caso.page';
import { FormulariosConsultaExternaPage } from './formularios_consulta_externa/formularios.page';
import { FormulariosConsultaExternaPageModule } from './formularios_consulta_externa/formularios.module';
var CasoConsultaExternaPageModule = /** @class */ (function () {
    function CasoConsultaExternaPageModule() {
    }
    CasoConsultaExternaPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                FormulariosConsultaExternaPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                FormulariosConsultaExternaPageModule
            ],
            declarations: [CasoConsultaExternaPage]
        })
    ], CasoConsultaExternaPageModule);
    return CasoConsultaExternaPageModule;
}());
export { CasoConsultaExternaPageModule };
//# sourceMappingURL=caso.module.js.map