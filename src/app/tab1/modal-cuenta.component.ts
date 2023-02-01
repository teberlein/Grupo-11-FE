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

  cancel_cuenta() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm_cuenta() {
    await this.cuentaService.addCuentas(this.nueva_cuenta)
    this.modalCtrl.dismiss(null,'confirm');
  }

  nueva_cuenta = {
    nombre: '',
    saldo: 0,
  }
}