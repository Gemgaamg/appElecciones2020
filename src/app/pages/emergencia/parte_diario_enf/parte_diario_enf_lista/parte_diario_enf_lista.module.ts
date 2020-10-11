import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParteDiarioEnfListaPage } from './parte_diario_enf_lista.page';
import { HistoriaClinicaPageModule } from 'src/app/asistentes/historia_clinica/historia_clinica_general.module';
import { HistoriaClinicaPage } from 'src/app/asistentes/historia_clinica/historia_clinica_general.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: CnttratemerPage
//   }
// ];

const routes: Routes = [
  {
    path:'',
    redirectTo:'/menu/cntenferm/parte_diario_enf_lista',
    pathMatch:'full'
  },
  {
    path: '',
    
    
    children:[
      {

        path: 'parte_diario_enf_lista',
        component: ParteDiarioEnfListaPage,
      },
      {
        path: 'parte_diario_enf',
        loadChildren:'../parte_diario_enf/parte_diario_enf.module#ParteDiarioEnfPageModule'
      },
      {
        path: 'evolucion_enf',
        loadChildren:'../parte_diario_enf/evolucion_enf/evolucion_enf.module#EvolucionEnfPageModule'
      },
    ]
  }
];


@NgModule({
  entryComponents:[
    HistoriaClinicaPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriaClinicaPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ParteDiarioEnfListaPage]
})
export class ParteDiarioEnfListaPageModule {}