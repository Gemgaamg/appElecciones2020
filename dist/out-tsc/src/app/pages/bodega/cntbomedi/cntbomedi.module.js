import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CntbomediPage } from './cntbomedi.page';
var routes = [
    {
        path: '',
        component: CntbomediPage
    }
];
var CntbomediPageModule = /** @class */ (function () {
    function CntbomediPageModule() {
    }
    CntbomediPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CntbomediPage]
        })
    ], CntbomediPageModule);
    return CntbomediPageModule;
}());
export { CntbomediPageModule };
//# sourceMappingURL=cntbomedi.module.js.map