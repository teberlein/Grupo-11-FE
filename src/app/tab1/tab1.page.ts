import { Component } from '@angular/core';

import { ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { MovimientosService } from '../core/services/movimientos.service';
import { CuentasService } from '../core/services/cuentas.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSelect,} from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private movimientoService: MovimientosService, private cuentaService: CuentasService,
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



  @ViewChild(IonModal) modal: IonModal;

  message = '';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    await this.movimientoService.addMovimientos(this.nuevo_movimiento)
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  nuevo_movimiento = {
    nombre: '',
    categoria: '',
    cuenta: '',
    monto: 0,
    ingreso_egreso: false,
  }


  
}

