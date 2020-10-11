import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DietaPage } from './dieta.page';
import { InfoDietaPage } from '../info_dieta/info_dieta.page';
import { InfoDietaPageModule } from '../info_dieta/info_dieta.module';
var DietaPageModule = /** @class */ (function () {
    function DietaPageModule() {
    }
    DietaPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                InfoDietaPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                InfoDietaPageModule
            ],
            declarations: [DietaPage]
        })
    ], DietaPageModule);
    return DietaPageModule;
}());
export { DietaPageModule };
//# sourceMappingURL=dieta.module.js.map