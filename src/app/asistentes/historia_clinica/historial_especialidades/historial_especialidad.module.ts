import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPorEspecialidad } from './historial_especialidad.page';
import { AtencionesPorEspecialidadPage } from './atenciones_por_especialidad/atenciones_por_especialidad.page';
import { AtencionesPorEspecialidadPageModule } from './atenciones_por_especialidad/atenciones_por_especialidad.module';


@NgModule({
  entryComponents:[
    AtencionesPorEspecialidadPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtencionesPorEspecialidadPageModule
  ],
  declarations: [HistorialPorEspecialidad]
})
export class HistorialPorEspecialidadModule {}
