import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
var routes = [
    {
        path: '',
        redirectTo: '/menu/main',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MenuPage,
        children: [
            {
                path: 'main',
                loadChildren: '../main/main.module#MainPageModule'
            },
            // {
            //   path: 'cntbofarma',
            //   loadChildren:'../bodega/cntbofarma/cntbofarma.module#CNTBOFARMAPageModule'
            // },
            {
                path: 'cntbofarma',
                loadChildren: '../bodega/cntbofarma/cntbofarma.module#CntbofarmaPageModule'
            },
            {
                path: 'cntbomedi',
                loadChildren: '../bodega/cntbomedi/cntbomedi.module#CntbomediPageModule'
            },
            {
                path: 'cnttratemer',
                loadChildren: '../emergencia/interconsulta/cnttratemer/cnttratemer.module#CnttratemerPageModule'
            },
            {
                path: 'cnttriaje',
                loadChildren: '../emergencia/parte_diario/cnttriaje/cnttriaje.module#CnttriajePageModule'
            },
            {
                path: 'pacientes',
                loadChildren: '../pacientes/lista_pacientes.module#ListaPacientesPageModule'
            },
            {
                path: 'cntenferm',
                loadChildren: '../emergencia/parte_diario_enf/parte_diario_enf_lista/parte_diario_enf_lista.module#ParteDiarioEnfListaPageModule'
            }
        ]
    }
];
var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MenuPage]
        })
    ], MenuPageModule);
    return MenuPageModule;
}());
export { MenuPageModule };
//# sourceMappingURL=menu.module.js.map