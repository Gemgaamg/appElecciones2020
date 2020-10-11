import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LaboratorioPage } from './laboratorio.page';
import { Cie10Page } from '../cie10/cie10.page';
import { Cie10PageModule } from '../cie10/cie10.module';
var LaboratorioPageModule = /** @class */ (function () {
    function LaboratorioPageModule() {
    }
    LaboratorioPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                Cie10Page
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                Cie10PageModule
            ],
            declarations: [LaboratorioPage]
        })
    ], LaboratorioPageModule);
    return LaboratorioPageModule;
}());
export { LaboratorioPageModule };
//# sourceMappingURL=laboratorio.module.js.map