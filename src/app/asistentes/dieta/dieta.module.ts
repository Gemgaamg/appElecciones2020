import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietaPage } from './dieta.page';
import { InfoDietaPage } from '../info_dieta/info_dieta.page';
import { InfoDietaPageModule } from '../info_dieta/info_dieta.module';



@NgModule({
  entryComponents:[
    InfoDietaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoDietaPageModule
  ],
  declarations: [DietaPage]
})
export class DietaPageModule {}
