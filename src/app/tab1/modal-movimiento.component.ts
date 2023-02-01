import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { CuentasService } from '../core/services/cuentas.service';
import { MovimientosService } from '../core/services/movimientos.service';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


@Component({
  selector: 'app-modal-movimiento',
  templateUrl: 'modal-movimiento.component.html',
})

@NgModule({
  imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      ExploreContainerComponentModule,
  ],
  declarations: [ModalMovimientoComponent]
})

export class ModalMovimientoComponent {
  name: string;

  constructor(private modalCtrl: ModalController, private movimientoService: MovimientosService, private cuentaService: CuentasService,
    public alertController: AlertController, movimientosService: MovimientosService, cuentasService: CuentasService) {}

    searchTerm: string;
    movimientos = []
    cuentas = []

    ngOnInit(){
      this.getMovimientos()
      this.getCuentas();
    }

    async getMovimientos() {
        this.movimientos = await this.movimientoService.getMovimientos()
        console.table(this.movimientos);
      }
  
      async getCuentas() {
        this.cuentas = await this.cuentaService.getCuentas()
        console.table(this.cuentas);
      }

  cancel_movimiento() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm_movimiento() {
    await this.movimientoService.addMovimientos(this.nuevo_movimiento)
    this.modalCtrl.dismiss(null,'confirm');
  }

  nuevo_movimiento = {
    nombre: '',
    categoria: '',
    cuenta: '',
    monto: 0,
    ingreso_egreso: false,
  }
}