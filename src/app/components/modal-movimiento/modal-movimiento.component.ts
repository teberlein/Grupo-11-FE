import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { CuentasService } from 'src/app/core/services/cuentas.service';
import { MovimientosService } from 'src/app/core/services/movimientos.service';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';



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
        // console.table(this.movimientos);
      }
  
      async getCuentas() {
        this.cuentas = await this.cuentaService.getCuentas()
        // console.table(this.cuentas);
      }

      actualizarSaldo() {
        if(this.nuevo_movimiento.ingreso_egreso == 'true')
        {
          this.cuenta.saldo = Number(this.nuevo_movimiento.monto) + Number(this.cuenta.saldo)
        }
        else if(this.nuevo_movimiento.ingreso_egreso == 'false')
        {
          this.cuenta.saldo = Number(this.cuenta.saldo) - Number(this.nuevo_movimiento.monto)
        }
      }

  cancel_movimiento() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm_movimiento() {
    this.cuenta = await this.cuentaService.getCuentaById(this.cuenta.id)
    this.actualizarSaldo()
    await this.movimientoService.addMovimientos(this.nuevo_movimiento)
    await this.cuentaService.addCuentas(this.cuenta)
    this.modalCtrl.dismiss(null,'confirm');
  }

  nuevo_movimiento = {
    nombre: '',
    categoria: '',
    cuenta: '',
    monto: 0,
    ingreso_egreso: '',
  }

  cuenta = {
    id: 0,
    nombre: '',
    saldo: 0,
  }

}