import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignosVitalesPage } from './signos_vitales.page';
import { ImagenPage } from '../imagen/imagen.page';
import { ImagenPageModule } from '../imagen/imagen.module';



@NgModule({
  entryComponents:[
    ImagenPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenPageModule
    
  ],
  declarations: [SignosVitalesPage]
})
export class SignosVitalesPageModule {}
