import { Component } from '@angular/core';

import { AlertController, ModalController } from '@ionic/angular';
import { CuentasService } from '../core/services/cuentas.service';
import { MovimientosService } from '../core/services/movimientos.service';


@Component({
  selector: 'app-modal-movimiento',
  templateUrl: 'modal-movimiento.component.html',
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
    this.getMovimientos()
    this.getCuentas();
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