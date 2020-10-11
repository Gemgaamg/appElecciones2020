import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasoConsultaExternaPage } from './caso.page';
import { FormulariosConsultaExternaPage } from './formularios_consulta_externa/formularios.page';
import { FormulariosConsultaExternaPageModule } from './formularios_consulta_externa/formularios.module';


@NgModule({
  entryComponents:[
    FormulariosConsultaExternaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormulariosConsultaExternaPageModule
  ],
  declarations: [CasoConsultaExternaPage]
})
export class CasoConsultaExternaPageModule {}
