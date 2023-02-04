import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CuentasService } from 'src/app/core/services/cuentas.service';
import { MovimientosService } from 'src/app/core/services/movimientos.service';

@Component({
  selector: 'app-vermas',
  templateUrl: './vermas.page.html',
  styleUrls: ['./vermas.page.scss'],
})
export class VermasPage implements OnInit {
  
  movimientos = [];

  constructor(
    private cuentasService: CuentasService,
    private movimientoService: MovimientosService,
    private navCtrl: NavController,
  ) {}

  async getMovimientos() {
    this.movimientos = await this.movimientoService.getMovimientos()
    this.movimientos = this.movimientos.reverse()
    console.table(this.movimientos);
  }

  ngOnInit() {
    this.getMovimientos();
  }

  volver() {
    this.navCtrl.navigateBack("")
  }
}
