import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialCasosPage } from './historial_casos.page';
import { FormulariosAtencionEmergenciaPage } from './formularios_atencion_emergencia/formularios_atencion_emergencia.page';
import { FormulariosAtencionEmergenciaPageModule } from './formularios_atencion_emergencia/formularios_atencion_emergencia.module';
import { CasoConsultaExternaPage } from './caso_consulta_externa/caso.page';
import { CasoConsultaExternaPageModule } from './caso_consulta_externa/caso.module';


@NgModule({
  entryComponents:[
    FormulariosAtencionEmergenciaPage,
    CasoConsultaExternaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulariosAtencionEmergenciaPageModule,
    CasoConsultaExternaPageModule
  ],
  declarations: [HistorialCasosPage]
})
export class HistorialCasosPageModule {}
