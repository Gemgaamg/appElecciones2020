import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EvolucionPage } from './evolucion.page';
import { LaboratorioPage } from 'src/app/asistentes/laboratorio/laboratorio.page';
import { LaboratorioPageModule } from 'src/app/asistentes/laboratorio/laboratorio.module';
import { RecetaPage } from 'src/app/asistentes/receta/receta.page';
import { RecetaPageModule } from 'src/app/asistentes/receta/receta.module';
import { TextAreaAutosizeModule } from 'src/app/autosize.directive';
import { InfoDietaPageModule } from 'src/app/asistentes/info_dieta/info_dieta.module';
import { InfoDietaPage } from 'src/app/asistentes/info_dieta/info_dieta.page';
import { DietaPage } from 'src/app/asistentes/dieta/dieta.page';
import { DietaPageModule } from 'src/app/asistentes/dieta/dieta.module';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
import { HistoriaClinicaPageModule } from 'src/app/asistentes/historia_clinica/historia_clinica_general.module';
var routes = [
    {
        path: '',
        component: EvolucionPage
    }
];
var EvolucionPageModule = /** @class */ (function () {
    function EvolucionPageModule() {
    }
    EvolucionPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                LaboratorioPage,
                RecetaPage,
                InfoDietaPage,
                DietaPage,
                HistoriaClinicaPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                LaboratorioPageModule,
                RecetaPageModule,
                InfoDietaPageModule,
                TextAreaAutosizeModule,
                DietaPageModule,
                HistoriaClinicaPageModule
            ],
            declarations: [
                EvolucionPage,
            ]
        })
    ], EvolucionPageModule);
    return EvolucionPageModule;
}());
export { EvolucionPageModule };
//# sourceMappingURL=evolucion.module.js.map