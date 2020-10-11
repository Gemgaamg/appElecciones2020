import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RespuestaInterconsultaPage } from './respuesta_interconsulta.page';
import { SolicitudInfoPage } from './solicitud-info/solicitud-info.page';
import { SolicitudInfoPageModule } from './solicitud-info/solicitud-info.module';
import { Cie10Page } from 'src/app/asistentes/cie10/cie10.page';
import { Cie10PageModule } from 'src/app/asistentes/cie10/cie10.module';
import { TextAreaAutosizeModule } from 'src/app/autosize.directive';
var routes = [
    {
        path: '',
        component: RespuestaInterconsultaPage
    }
];
var RespuestaInterconsultaPageModule = /** @class */ (function () {
    function RespuestaInterconsultaPageModule() {
    }
    RespuestaInterconsultaPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                SolicitudInfoPage,
                Cie10Page,
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                SolicitudInfoPageModule,
                Cie10PageModule,
                TextAreaAutosizeModule
            ],
            declarations: [RespuestaInterconsultaPage]
        })
    ], RespuestaInterconsultaPageModule);
    return RespuestaInterconsultaPageModule;
}());
export { RespuestaInterconsultaPageModule };
//# sourceMappingURL=respuesta_interconsulta.module.js.map