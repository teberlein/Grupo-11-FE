import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CuentasService } from 'src/app/core/services/cuentas.service';
import { MovimientosService } from 'src/app/core/services/movimientos.service';

import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
})
export class MovimientosPage implements OnInit {

  constructor(
    private ar: ActivatedRoute,
    private cuentaService: CuentasService,
    private movimientosService: MovimientosService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
  ) {
    ar.params.subscribe(async param =>{
      // console.log(param["id"]);
      this.movimiento = await this.movimientosService.getMovimientoPorId(param["id"])
      this.cuenta = await this.cuentaService.getCuentaById(Number(this.movimiento.cuenta))
      // console.table(this.cuenta)
      // console.table(this.movimiento)
    })
  }

  result?: string;

  movimiento = {
    id:0,
    nombre: '',
    categoria: '',
    cuenta: '',
    monto: 0,
    ingreso_egreso: false,
  }

  cuenta = {
    id:0,
    nombre:'',
    saldo:0,
  }

  ngOnInit() {
  }

  volver() {
    this.navCtrl.back();
  }

  actualizarSaldo() {
    if(this.movimiento.ingreso_egreso === false)
    {
      this.cuenta.saldo = Number(this.movimiento.monto) + Number(this.cuenta.saldo)
      // console.log("El saldo es " + this.cuenta.saldo)
    }
    else if(this.movimiento.ingreso_egreso === true)
    {
      this.cuenta.saldo = Number(this.cuenta.saldo) - Number(this.movimiento.monto)
      // console.log("El saldo es " + this.cuenta.saldo)
    }
  }

  async borrarMovimiento() {
    await this.movimientosService.borrarMovimiento(this.movimiento.id)
    this.actualizarSaldo()
    await this.cuentaService.addCuentas(this.cuenta)
    this.volver();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Estás seguro?',
      subHeader: 'Se eliminará el movimiento y se modificará el saldo de la cuenta',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if(result.role === "destructive") await this.borrarMovimiento()
}}
