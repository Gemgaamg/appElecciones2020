import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParteDiarioEnfPage } from './parte_diario_enf.page';

// import { SolicitudInfoPage } from './solicitud-info/solicitud-info.page';
// import { SolicitudInfoPageModule } from './solicitud-info/solicitud-info.module';
import { Cie10Page } from 'src/app/asistentes/cie10/cie10.page';
import { Cie10PageModule } from 'src/app/asistentes/cie10/cie10.module';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';
import { HistoriaClinicaPageModule } from 'src/app/asistentes/historia_clinica/historia_clinica_general.module';

const routes: Routes = [
  {
    path: '',
    component: ParteDiarioEnfPage
  }
];


@NgModule({

  entryComponents:[
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
  declarations: [ParteDiarioEnfPage]
})
export class ParteDiarioEnfPageModule {} 
