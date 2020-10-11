import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListaPacientesPage } from './lista_pacientes.page';
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
        redirectTo: '/menu/pacientes',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: '',
                component: ListaPacientesPage,
            },
        ]
    }
];
var ListaPacientesPageModule = /** @class */ (function () {
    function ListaPacientesPageModule() {
    }
    ListaPacientesPageModule = tslib_1.__decorate([
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
            declarations: [ListaPacientesPage]
        })
    ], ListaPacientesPageModule);
    return ListaPacientesPageModule;
}());
export { ListaPacientesPageModule };
//# sourceMappingURL=lista_pacientes.module.js.map