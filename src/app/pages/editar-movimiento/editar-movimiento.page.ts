import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CuentasService } from 'src/app/core/services/cuentas.service';
import { MovimientosService } from 'src/app/core/services/movimientos.service';

@Component({
  selector: 'app-editar-movimiento',
  templateUrl: './editar-movimiento.page.html',
  styleUrls: ['./editar-movimiento.page.scss'],
})
export class EditarMovimientoPage implements OnInit {

  constructor(
    private ar: ActivatedRoute,
    private cuentaService: CuentasService,
    private movimientosService: MovimientosService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
  ) {
    ar.params.subscribe(async param =>{
      console.log(param["id"]);
      this.movimiento_inicial = await this.movimientosService.getMovimientoPorId(param["id"])
      this.movimiento_final = await this.movimientosService.getMovimientoPorId(param["id"])
      this.cuenta_inicial = await this.cuentaService.getCuentaById(Number(this.movimiento_inicial.cuenta))
      this.cuenta_final = await this.cuentaService.getCuentaById(Number(this.movimiento_inicial.cuenta))
      this.cuentas = await this.cuentaService.getCuentas()
    })
  }

  ngOnInit(){
  }

  movimiento_inicial = {
    id:0,
    nombre: '',
    categoria: '',
    cuenta: '',
    monto: 0,
    ingreso_egreso: false,
  }

  cuenta_inicial = {
    id:0,
    nombre:'',
    saldo:0,
  }

  cuentas = []

  volver() {
    this.navCtrl.back();
  }

  async cambiarCuenta() {
      this.cuenta_final = await this.cuentaService.getCuentaById(this.cuenta_final.id)
  }

   async actualizarSaldo() {

    // Si es un egreso y la cuenta no cambia
     if(this.movimiento_inicial.ingreso_egreso == false && this.movimiento_final.ingreso_egreso == 'false' && this.cuenta_final.id == this.cuenta_inicial.id)
     {
       this.cuenta_final.saldo = Number(this.cuenta_final.saldo) - (Number(this.movimiento_final.monto) - Number(this.movimiento_inicial.monto))
       console.log ('Es un egreso y no cambió la cuenta')
     }

     // Si es un ingreso y la cuenta no cambia
     else if(this.movimiento_inicial.ingreso_egreso == true && this.movimiento_final.ingreso_egreso == 'true' && this.cuenta_final.id == this.cuenta_inicial.id)
     {
       this.cuenta_final.saldo = Number(this.cuenta_final.saldo) + (Number(this.movimiento_final.monto) - Number(this.movimiento_inicial.monto))
       console.log ('Es un ingreso y no cambió la cuenta')
     }

     // Si es un egreso y la cuenta cambia
     else if(this.movimiento_inicial.ingreso_egreso == false && this.movimiento_final.ingreso_egreso == 'false' && this.cuenta_final.id != this.cuenta_inicial.id)
     {
      this.cuenta_inicial.saldo = Number(this.cuenta_inicial.saldo) + Number(this.movimiento_inicial.monto)
      this.cuenta_final.saldo = Number(this.cuenta_final.saldo) - Number(this.movimiento_final.monto)
      await this.cuentaService.addCuentas(this.cuenta_inicial)
      console.log('Es un egreso y cambió la cuenta')
     }

     // Si es un ingreso y la cuenta cambia
     else if(this.movimiento_inicial.ingreso_egreso == true && this.movimiento_final.ingreso_egreso == 'true' && this.cuenta_final.id != this.cuenta_inicial.id)
     {
      this.cuenta_inicial.saldo = Number(this.cuenta_inicial.saldo) - Number(this.movimiento_inicial.monto)
      this.cuenta_final.saldo = Number(this.cuenta_final.saldo) + Number(this.movimiento_final.monto)
      await this.cuentaService.addCuentas(this.cuenta_inicial)
      console.log('Es un ingreso y cambió la cuenta')
     }
     
     // Si cambia de ingreso a egreso y cambia la cuenta
     else if(this.movimiento_inicial.ingreso_egreso == true && this.movimiento_final.ingreso_egreso == 'false' && this.cuenta_final.id != this.cuenta_inicial.id)
     {
      this.cuenta_inicial.saldo = Number(this.cuenta_inicial.saldo) - Number(this.movimiento_inicial.monto)
      this.cuenta_final.saldo = Number(this.cuenta_final.saldo) - Number(this.movimiento_inicial.monto)
      await this.cuentaService.addCuentas(this.cuenta_inicial)
      console.log ('Pasó de ingreso a egreso y cambió la cuenta')
     }

     // Si cambia de egreso a ingreso y cambia la cuenta
     else if (this.movimiento_inicial.ingreso_egreso == false && this.movimiento_final.ingreso_egreso == 'true' && this.cuenta_final.id != this.cuenta_inicial.id)
     {
      this.cuenta_inicial.saldo = Number(this.cuenta_inicial.saldo) + Number(this.movimiento_inicial.monto)
      this.cuenta_final.saldo = Number(this.cuenta_final.saldo) + Number(this.movimiento_inicial.monto)
      await this.cuentaService.addCuentas(this.cuenta_inicial)
      console.log ('Pasó de egreso a ingreso y cambió la cuenta')
     }
     
     //Si cambia de ingreso a egreso pero no cambia la cuenta
     else if (this.movimiento_inicial.ingreso_egreso == true && this.movimiento_final.ingreso_egreso == 'false' && this.cuenta_final.id == this.cuenta_inicial.id)
     {
      this.cuenta_final.saldo = Number(this.cuenta_final.saldo) - Number(this.movimiento_inicial.monto) - (this.movimiento_final.monto)
     }

     //Si cambia de egreso a ingreso pero no cambia la cuenta
     else if (this.movimiento_inicial.ingreso_egreso == false && this.movimiento_final.ingreso_egreso == 'true' && this.cuenta_final.id == this.cuenta_inicial.id)
     {
      this.cuenta_final.saldo = Number(this.cuenta_final.saldo) + Number(this.movimiento_inicial.monto) + Number(this.movimiento_final.monto)
     }

     else {
      console.log('Situación inesperada. Movimiento inicial: ')
      console.table(this.movimiento_inicial.ingreso_egreso)
      console.table(this.movimiento_final.ingreso_egreso)
     }
   }
  
  async confirm_movimiento() {
    await this.movimientosService.addMovimientos(this.movimiento_final)
    await this.cambiarCuenta()
    await this.actualizarSaldo()
    // console.log ('monto inicial: ' + this.movimiento_inicial.monto)
    // console.log ('monto final: ' + this.movimiento_final.monto)
    // console.table(this.cuenta_final)
    await this.cuentaService.addCuentas(this.cuenta_final)
    this.volver();
  }

  movimiento_final = {
    id:0,
    nombre: '',
    categoria: '',
    cuenta: '',
    monto: 0,
    ingreso_egreso: '',
  }

  cuenta_final = {
    id:0,
    nombre:'',
    saldo:0,
  }
}
