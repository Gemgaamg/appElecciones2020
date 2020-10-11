import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriaClinicaPage } from './historia_clinica_general.page';
import { HistorialCasosPage } from './historial_casos/historial_casos.page';
import { HistorialCasosPageModule } from './historial_casos/historial_casos.module';
import { HistorialPorEspecialidad } from './historial_especialidades/historial_especialidad.page';
import { HistorialPorEspecialidadModule } from './historial_especialidades/historial_especialidad.module';
import { AntecedentesPage } from './antecedentes/antecedentes.page';
import { AntecedentesPageModule } from './antecedentes/antecedentes.module';


@NgModule({
  entryComponents:[
    HistorialCasosPage,
    HistorialPorEspecialidad,
    AntecedentesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialCasosPageModule,
    HistorialPorEspecialidadModule,
    AntecedentesPageModule
  ],
  declarations: [HistoriaClinicaPage]
})
export class HistoriaClinicaPageModule {}
