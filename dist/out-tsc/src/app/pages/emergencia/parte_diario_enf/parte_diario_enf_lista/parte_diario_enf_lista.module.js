import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ParteDiarioEnfListaPage } from './parte_diario_enf_lista.page';
import { HistoriaClinicaPageModule } from 'src/app/asistentes/historia_clinica/historia_clinica_general.module';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
// const routes: Routes = [
//   {
//     path: '',
//     component: CnttratemerPage
//   }
// ];
var routes = [
    {
        path: '',
        redirectTo: '/menu/cntenferm/parte_diario_enf_lista',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'parte_diario_enf_lista',
                component: ParteDiarioEnfListaPage,
            },
            {
                path: 'parte_diario_enf',
                loadChildren: '../parte_diario_enf/parte_diario_enf.module#ParteDiarioEnfPageModule'
            },
            {
                path: 'evolucion_enf',
                loadChildren: '../parte_diario_enf/evolucion_enf/evolucion_enf.module#EvolucionEnfPageModule'
            },
        ]
    }
];
var ParteDiarioEnfListaPageModule = /** @class */ (function () {
    function ParteDiarioEnfListaPageModule() {
    }
    ParteDiarioEnfListaPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                HistoriaClinicaPage,
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                HistoriaClinicaPageModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ParteDiarioEnfListaPage]
        })
    ], ParteDiarioEnfListaPageModule);
    return ParteDiarioEnfListaPageModule;
}());
export { ParteDiarioEnfListaPageModule };
//# sourceMappingURL=parte_diario_enf_lista.module.js.map