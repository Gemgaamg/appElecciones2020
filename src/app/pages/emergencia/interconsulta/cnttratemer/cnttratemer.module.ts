import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CnttratemerPage } from './cnttratemer.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: CnttratemerPage
//   }
// ];

const routes: Routes = [
  {
    path:'',
    redirectTo:'/menu/cnttratemer/mis_interconsultas',
    pathMatch:'full'
  },
  {
    path: '',
    
    
    children:[
      {

        path: 'mis_interconsultas',
        component: CnttratemerPage,
      },
      {
        path: 'respuesta_interconsulta',
        loadChildren:'../respuesta_interconsulta/respuesta_interconsulta.module#RespuestaInterconsultaPageModule'
      },
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CnttratemerPage]
})
export class CnttratemerPageModule {}