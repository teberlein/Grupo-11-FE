import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CuentasService } from 'src/app/core/services/cuentas.service';
import { MovimientosService } from 'src/app/core/services/movimientos.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  movimientos = []

  cuenta = {
    id:0,
    nombre:'',
    saldo:0,
  }

  constructor(
    private ar: ActivatedRoute,
    private cuentasService: CuentasService,
    private movimientosService: MovimientosService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private ts: ToastService
  ) {
    ar.params.subscribe(async param =>{
      console.log(param["id"]);
      this.cuenta = await this.cuentasService.getCuentaById(param["id"])
      this.movimientos = await this.movimientosService.getMovimientosPorCuenta(param["id"])
      this.movimientos = this.movimientos.reverse()
      console.table(this.movimientos)
      console.table(this.cuenta)
    })
  }

  result?: string;

  ngOnInit() {
  }

  volver() {
    this.navCtrl.back()
  }

  async borrarCuenta() {
    await this.cuentasService.borrarCuenta(this.cuenta.id)
    for (let movimiento of this.movimientos) {
      await this.movimientosService.borrarMovimiento(movimiento.id);
    }
    this.volver();
    this.ts.presentToast("La cuenta se borró con éxito.");
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Estás seguro?',
      subHeader: 'Se eliminará la cuenta y todos los movimientos relacionados a ella',
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
    if(result.role === "destructive") await this.borrarCuenta()

}
}
