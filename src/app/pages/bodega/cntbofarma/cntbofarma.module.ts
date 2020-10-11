import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CntbofarmaPage } from './cntbofarma.page';

const routes: Routes = [
  {
    path: '',
    component: CntbofarmaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CntbofarmaPage]
})
export class CntbofarmaPageModule {}
