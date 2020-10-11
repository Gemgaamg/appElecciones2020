import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormulariosConsultaExternaPage } from './formularios.page';
import { ResumenSolicitudLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.page';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
import { ResumenRecetaPageModule } from 'src/app/asistentes/resumen_formularios/receta/receta.module';
import { ResumenSolicitudLaboratorioPageModule } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.module';
import { ResultadosLaboratorioPageModule } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.module';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';
import { ResumenF02Page } from 'src/app/asistentes/resumen_formularios/resumen_f02/resumen_f02.page';
import { ResumenF02PageModule } from 'src/app/asistentes/resumen_formularios/resumen_f02/resumen_f02.module';
import { ResumenF053CEPage } from 'src/app/asistentes/resumen_formularios/resumen_f053ce/resumen_f053ce.page';
import { ResumenF053CEPageModule } from 'src/app/asistentes/resumen_formularios/resumen_f053ce/resumen_f053ce.module';
import { ResumenF07CESolicitudPage } from 'src/app/asistentes/resumen_formularios/resumen_f07ce_solicitud/resumen_f07ce_solicitud.page';
import { ResumenF07CESolicitudPageModule } from 'src/app/asistentes/resumen_formularios/resumen_f07ce_solicitud/resumen_f07ce_solicitud.module';
var FormulariosConsultaExternaPageModule = /** @class */ (function () {
    function FormulariosConsultaExternaPageModule() {
    }
    FormulariosConsultaExternaPageModule = tslib_1.__decorate([
        NgModule({
            entryComponents: [
                ResumenRecetaPage,
                ResumenSolicitudLaboratorioPage,
                ResultadosLaboratorioPage,
                ResumenF02Page,
                ResumenF053CEPage,
                ResumenF07CESolicitudPage
            ],
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ResumenRecetaPageModule,
                ResumenSolicitudLaboratorioPageModule,
                ResultadosLaboratorioPageModule,
                ResumenF02PageModule,
                ResumenF053CEPageModule,
                ResumenF07CESolicitudPageModule
            ],
            declarations: [FormulariosConsultaExternaPage]
        })
    ], FormulariosConsultaExternaPageModule);
    return FormulariosConsultaExternaPageModule;
}());
export { FormulariosConsultaExternaPageModule };
//# sourceMappingURL=formularios.module.js.map