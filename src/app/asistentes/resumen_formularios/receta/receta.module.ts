import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenRecetaPage } from './receta.page';


@NgModule({
  entryComponents:[
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ResumenRecetaPage]
})
export class ResumenRecetaPageModule {}
