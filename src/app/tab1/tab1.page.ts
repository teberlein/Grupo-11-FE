import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { MovimientosService } from '../core/services/movimientos.service';
import { CuentasService } from '../core/services/cuentas.service';
import { ModalCuentaComponent } from '../components/modal-cuenta/modal-cuenta.component';
import { ModalMovimientoComponent } from '../components/modal-movimiento/modal-movimiento.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modalCtrl: ModalController, private movimientoService: MovimientosService, private cuentaService: CuentasService,
    public alertController: AlertController, movimientosService: MovimientosService, cuentasService: CuentasService) 
    {
      this.getMovimientos()
      this.getCuentas();
    }

  searchTerm: string;
    movimientos = []
    cincoMovimientos = []
    cuentas = []

  ngOnInit(){
    // this.getMovimientos()
    // this.getCuentas();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter')
    this.getMovimientos()
    this.getCuentas();
  }

  async getMovimientos() {
    this.movimientos = await this.movimientoService.getMovimientos()
    this.movimientos = this.movimientos.reverse()
    this.cincoMovimientos = this.movimientos.slice(0,5)
    // console.table(this.cincoMovimientos);
  }

  async getCuentas() {
    this.cuentas = await this.cuentaService.getCuentas()
    // console.table(this.cuentas);
  }

  async modalMovimiento() {
    if(this.cuentas.length == 0){
      console.log (false)
      const alert = await this.alertController.create({
        header: 'Para anadir un movimiento primero debe añadir una cuenta',
        buttons: ['OK'],
      });
  
      await alert.present();
    }

    else if (this.cuentas.length > 0)
    {const modal = await this.modalCtrl.create
      ({
        component: ModalMovimientoComponent,
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();
      console.log(this.cuentas.length)
      this.getMovimientos();
      this.getCuentas();
    }
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

  handleRefresh(event) {
    setTimeout(() => {
      console.log('actualizando')
      this.getCuentas()
      this.getMovimientos()
      event.target.complete();
    }, 100);
  };
}

