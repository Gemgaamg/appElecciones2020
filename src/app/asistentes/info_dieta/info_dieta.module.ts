import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoDietaPage } from './info_dieta.page';


@NgModule({
  entryComponents:[
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [InfoDietaPage]
})
export class InfoDietaPageModule {}
