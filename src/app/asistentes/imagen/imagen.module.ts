import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenPage } from './imagen.page';


@NgModule({
  entryComponents:[
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ImagenPage]
})
export class ImagenPageModule {}
