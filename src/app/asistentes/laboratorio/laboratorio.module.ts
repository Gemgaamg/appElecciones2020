import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaboratorioPage } from './laboratorio.page';
import { Cie10Page } from '../cie10/cie10.page';
import { Cie10PageModule } from '../cie10/cie10.module';


@NgModule({
  entryComponents:[
    Cie10Page
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cie10PageModule
  ],
  declarations: [LaboratorioPage]
})
export class LaboratorioPageModule {}
