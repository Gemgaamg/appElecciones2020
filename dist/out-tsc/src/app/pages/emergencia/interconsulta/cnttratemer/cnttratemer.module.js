import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CnttratemerPage } from './cnttratemer.page';
// const routes: Routes = [
//   {
//     path: '',
//     component: CnttratemerPage
//   }
// ];
var routes = [
    {
        path: '',
        redirectTo: '/menu/cnttratemer/mis_interconsultas',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'mis_interconsultas',
                component: CnttratemerPage,
            },
            {
                path: 'respuesta_interconsulta',
                loadChildren: '../respuesta_interconsulta/respuesta_interconsulta.module#RespuestaInterconsultaPageModule'
            },
        ]
    }
];
var CnttratemerPageModule = /** @class */ (function () {
    function CnttratemerPageModule() {
    }
    CnttratemerPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CnttratemerPage]
        })
    ], CnttratemerPageModule);
    return CnttratemerPageModule;
}());
export { CnttratemerPageModule };
//# sourceMappingURL=cnttratemer.module.js.map