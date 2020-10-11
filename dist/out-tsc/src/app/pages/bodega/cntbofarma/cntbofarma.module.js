import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CntbofarmaPage } from './cntbofarma.page';
var routes = [
    {
        path: '',
        component: CntbofarmaPage
    }
];
var CntbofarmaPageModule = /** @class */ (function () {
    function CntbofarmaPageModule() {
    }
    CntbofarmaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CntbofarmaPage]
        })
    ], CntbofarmaPageModule);
    return CntbofarmaPageModule;
}());
export { CntbofarmaPageModule };
//# sourceMappingURL=cntbofarma.module.js.map