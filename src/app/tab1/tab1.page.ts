import { Component } from '@angular/core';

import { ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { MovimientosService } from '../core/services/movimientos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private movimientoService: MovimientosService,
    public alertController: AlertController, movimientosService: MovimientosService) {}

    searchTerm: string;
    movimientos = []

    ngOnInit(){
      this.getMovimientos()
    }

    //todosLosMovimientos = []
    async getMovimientos() {
      this.movimientos = await this.movimientoService.getMovimientos()
      console.table(this.movimientos);
      //this.todosLosMovimientos = Array.from(this.movimientos)
    }

  @ViewChild(IonModal) modal: IonModal;

  message = '';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}

