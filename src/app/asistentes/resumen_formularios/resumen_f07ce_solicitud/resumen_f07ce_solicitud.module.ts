import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenF07CESolicitudPage } from './resumen_f07ce_solicitud.page';
import { ResumenF07CERespuestaPage } from '../resumen_f07ce_respuesta/resumen_f07ce_respuesta.page';
import { ResumenF07CERespuestaPageModule } from '../resumen_f07ce_respuesta/resumen_f07ce_respuesta.module';


@NgModule({
  entryComponents:[
    ResumenF07CERespuestaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenF07CERespuestaPageModule
  ],
  declarations: [ResumenF07CESolicitudPage]
})
export class ResumenF07CESolicitudPageModule {}
