import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenSolicitudLaboratorioPage } from './solicitud.page';


@NgModule({
  entryComponents:[
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ResumenSolicitudLaboratorioPage]
})
export class ResumenSolicitudLaboratorioPageModule {}
