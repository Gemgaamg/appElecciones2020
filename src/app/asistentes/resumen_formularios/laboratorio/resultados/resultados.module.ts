import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadosLaboratorioPage } from './resultados.page';


@NgModule({
  entryComponents:[
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ResultadosLaboratorioPage]
})
export class ResultadosLaboratorioPageModule {}
