import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalMovimientoComponent } from './modal-movimiento.component';
import { ModalCuentaComponent } from './modal-cuenta.component';
import { MovimientosService } from '../core/services/movimientos.service';
import { CuentasService } from '../core/services/cuentas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
  }

  async modalCuenta() {
    const modal = await this.modalCtrl.create({
      component: ModalCuentaComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }


}
