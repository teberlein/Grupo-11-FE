import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CuentasService } from 'src/app/core/services/cuentas.service';
import { MovimientosService } from 'src/app/core/services/movimientos.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  cuenta = {};
  movimientos = [];

  constructor(
    private ar: ActivatedRoute,
    private cuentasService: CuentasService,
    private movimientosService: MovimientosService,
    private navCtrl: NavController,
  ) {
    ar.params.subscribe(async param =>{
      console.log(param["id"]);
      this.cuenta = await this.cuentasService.getCuentaById(param["id"])
      this.movimientos = await this.movimientosService.getMovimientosPorCategoria(param["id"])
      this.movimientos = this.movimientos.reverse()
      console.table(this.movimientos)
      console.table(this.cuenta)
    })
  }

  ngOnInit() {
  }

  volver() {
    this.navCtrl.navigateBack("")
  }

}
