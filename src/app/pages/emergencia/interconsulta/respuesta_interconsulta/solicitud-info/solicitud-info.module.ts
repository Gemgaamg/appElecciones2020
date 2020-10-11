import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudInfoPage } from './solicitud-info.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
    
  ],
  declarations: [SolicitudInfoPage]
})
export class SolicitudInfoPageModule {}
