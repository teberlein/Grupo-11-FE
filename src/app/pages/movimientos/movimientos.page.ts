import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CuentasService } from 'src/app/core/services/cuentas.service';
import { MovimientosService } from 'src/app/core/services/movimientos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
})
export class MovimientosPage implements OnInit {

  movimiento = {};

  constructor(
    private ar: ActivatedRoute,
    private cuentasService: CuentasService,
    private movimientosService: MovimientosService,
    private navCtrl: NavController,
  ) {
    ar.params.subscribe(async param =>{
      console.log(param["id"]);
      this.movimiento = await this.movimientosService.getMovimientoPorId(param["id"])
      console.table(this.movimiento)
    })
  }

  ngOnInit() {
  }

  volver() {
    this.navCtrl.navigateBack("")
  }

}
