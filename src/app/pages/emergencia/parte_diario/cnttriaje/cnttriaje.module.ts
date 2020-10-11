import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CnttriajePage } from './cnttriaje.page';
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
    redirectTo:'/menu/cnttriaje/parte_diario_lista',
    pathMatch:'full'
  },
  {
    path: '',
    
    
    children:[
      {

        path: 'parte_diario_lista',
        component: CnttriajePage,
      },
      {
        path: 'parte_diario',
        loadChildren:'../parte_diario/parte_diario.module#ParteDiarioPageModule'
      },
      {
        path: 'evolucion',
        loadChildren:'../parte_diario/evolucion/evolucion.module#EvolucionPageModule'
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
  declarations: [CnttriajePage]
})
export class CnttriajePageModule {}