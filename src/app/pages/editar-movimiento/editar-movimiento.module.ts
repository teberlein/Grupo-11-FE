import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarMovimientoPageRoutingModule } from './editar-movimiento-routing.module';

import { EditarMovimientoPage } from './editar-movimiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarMovimientoPageRoutingModule
  ],
  declarations: [EditarMovimientoPage]
})
export class EditarMovimientoPageModule {}
