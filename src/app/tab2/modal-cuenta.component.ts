import { Component } from '@angular/core';

import { AlertController, ModalController } from '@ionic/angular';
import { CuentasService } from '../core/services/cuentas.service';
import { MovimientosService } from '../core/services/movimientos.service';


@Component({
  selector: 'app-modal-cuenta',
  templateUrl: 'modal-cuenta.component.html',
})
export class ModalCuentaComponent {
  name: string;

  constructor(private modalCtrl: ModalController, private movimientoService: MovimientosService, private cuentaService: CuentasService,
    public alertController: AlertController, movimientosService: MovimientosService, cuentasService: CuentasService) {}

    searchTerm: string;
    movimientos = []
    cuentas = []

    async getMovimientos() {
        this.movimientos = await this.movimientoService.getMovimientos()
        console.table(this.movimientos);
      }
  
      async getCuentas() {
        this.cuentas = await this.cuentaService.getCuentas()
        console.table(this.cuentas);
      }

  cancel_cuenta() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm_cuenta() {
    await this.cuentaService.addCuentas(this.nueva_cuenta)
    this.getMovimientos()
    this.getCuentas();
    this.modalCtrl.dismiss(null,'confirm');
  }

  nueva_cuenta = {
    nombre: '',
    saldo: 0,
  }
}