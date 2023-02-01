import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalMovimientoComponent } from './modal-movimiento.component';
import { ModalCuentaComponent } from './modal-cuenta.component';
import { MovimientosService } from '../core/services/movimientos.service';
import { CuentasService } from '../core/services/cuentas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

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

  async modalMovimiento() {
    const modal = await this.modalCtrl.create({
      component: ModalMovimientoComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.getMovimientos();
    this.getCuentas();
  }

  async modalCuenta() {
    const modal = await this.modalCtrl.create({
      component: ModalCuentaComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    this.getMovimientos();
    this.getCuentas();
  }
}

