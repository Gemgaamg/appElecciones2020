import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvolucionEnfPage } from './evolucion_enf.page';


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
import { NandaPage } from 'src/app/asistentes/nanda/nanda.page';
import { NandaPageModule } from 'src/app/asistentes/nanda/nanda.module';
import { SignosVitalesPageModule } from 'src/app/asistentes/signos_vitales/signos_vitales.module';
import { SignosVitalesPage } from 'src/app/asistentes/signos_vitales/signos_vitales.page';


const routes: Routes = [
  {
    path: '',
    component: EvolucionEnfPage

  }
];


@NgModule({
  entryComponents:[
    LaboratorioPage,
    RecetaPage,
    InfoDietaPage,
    DietaPage,
    HistoriaClinicaPage,
    NandaPage,
    SignosVitalesPage
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
    HistoriaClinicaPageModule,
    NandaPageModule,
    SignosVitalesPageModule
  ],
  declarations: [
    EvolucionEnfPage,
    

    // TextAreaAutosizeDirective,
  ]
})
export class EvolucionEnfPageModule {} 
