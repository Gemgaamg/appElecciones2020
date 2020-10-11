import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ParteDiarioPage } from './parte_diario.page';
// import { SolicitudInfoPage } from './solicitud-info/solicitud-info.page';
// import { SolicitudInfoPageModule } from './solicitud-info/solicitud-info.module';
import { Cie10Page } from 'src/app/asistentes/cie10/cie10.page';
import { Cie10PageModule } from 'src/app/asistentes/cie10/cie10.module';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
import { HistoriaClinicaPageModule } from 'src/app/asistentes/historia_clinica/historia_clinica_general.module';
var routes = [
    {
        path: '',
        component: ParteDiarioPage
    }
];
var ParteDiarioPageModule = /** @class */ (function () {
    function ParteDiarioPageModule() {
    }
    ParteDiarioPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                // SolicitudInfoPage,
                Cie10Page,
                HistoriaClinicaPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                // SolicitudInfoPageModule,
                Cie10PageModule,
                HistoriaClinicaPageModule
            ],
            declarations: [ParteDiarioPage]
        })
    ], ParteDiarioPageModule);
    return ParteDiarioPageModule;
}());
export { ParteDiarioPageModule };
//# sourceMappingURL=parte_diario.module.js.map