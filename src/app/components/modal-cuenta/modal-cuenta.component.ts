import { Component } from '@angular/core';

import { AlertController, ModalController } from '@ionic/angular';
import { CuentasService } from 'src/app/core/services/cuentas.service';
import { MovimientosService } from 'src/app/core/services/movimientos.service';
import { ToastService } from 'src/app/core/services/toast.service';



@Component({
  selector: 'app-modal-cuenta',
  templateUrl: 'modal-cuenta.component.html',
})
export class ModalCuentaComponent {
  name: string;

  constructor(private modalCtrl: ModalController, private movimientoService: MovimientosService, private cuentaService: CuentasService,
    public alertController: AlertController, movimientosService: MovimientosService, cuentasService: CuentasService, private ts:ToastService) {}

  cancel_cuenta() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm_cuenta() {
    if (this.nueva_cuenta.nombre != '' && this.nueva_cuenta.saldo > 0) {
      await this.cuentaService.addCuentas(this.nueva_cuenta)
      this.modalCtrl.dismiss(null,'confirm');
      this.ts.presentToast("La cuenta se agregó con éxito.");
    }
    else {
      console.log (false)
      const alert = await this.alertController.create({
        header: 'Revise que todos los campos hayan sido rellenados',
        buttons: ['OK'],
      });
  
      await alert.present();
    }
  }

  nueva_cuenta = {
    nombre: '',
    saldo: 0,
  }
}