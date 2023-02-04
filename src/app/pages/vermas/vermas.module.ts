import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VermasPageRoutingModule } from './vermas-routing.module';

import { VermasPage } from './vermas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VermasPageRoutingModule
  ],
  declarations: [VermasPage]
})
export class VermasPageModule {}
