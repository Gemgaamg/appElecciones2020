import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormulariosAtencionEmergenciaPage } from './formularios_atencion_emergencia.page';
import { ParteDiarioAtencionEmergenciaPage } from 'src/app/asistentes/resumen_formularios/atencion_diaria_emergencia/parte_diario_atencion_emergencia.page';
import { ParteDiarioAtencionEmergenciaPageModule } from 'src/app/asistentes/resumen_formularios/atencion_diaria_emergencia/parte_diario_atencion_emergencia.module';
import { ResumenF08Page } from 'src/app/asistentes/resumen_formularios/resumen_f08/resumen_f08.page';
import { ResumenF08PageModule } from 'src/app/asistentes/resumen_formularios/resumen_f08/resumen_f08.module';
import { ResumenSolicitudLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.page';
import { ResumenSolicitudLaboratorioPageModule } from 'src/app/asistentes/resumen_formularios/laboratorio/solicitud/solicitud.module';
import { ResultadosLaboratorioPage } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.page';
import { ResultadosLaboratorioPageModule } from 'src/app/asistentes/resumen_formularios/laboratorio/resultados/resultados.module';
import { ResumenRecetaPage } from 'src/app/asistentes/resumen_formularios/receta/receta.page';
import { ResumenRecetaPageModule } from 'src/app/asistentes/resumen_formularios/receta/receta.module';
import { ResumenF05Page } from 'src/app/asistentes/resumen_formularios/resumen_f05/resumen_f05.page';
import { ResumenF05PageModule } from 'src/app/asistentes/resumen_formularios/resumen_f05/resumen_f05.module';


@NgModule({
  entryComponents:[
    ParteDiarioAtencionEmergenciaPage,
    ResumenF08Page,
    ResumenSolicitudLaboratorioPage,
    ResultadosLaboratorioPage,
    ResumenRecetaPage,
    ResumenF05Page
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParteDiarioAtencionEmergenciaPageModule,
    ResumenF08PageModule,
    ResumenSolicitudLaboratorioPageModule,
    ResultadosLaboratorioPageModule,
    ResumenRecetaPageModule,
    ResumenF05PageModule
  ],
  declarations: [FormulariosAtencionEmergenciaPage]
})
export class FormulariosAtencionEmergenciaPageModule {}
