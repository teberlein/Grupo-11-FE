import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { MovimientosService } from '../core/services/movimientos.service';
import { CuentasService } from '../core/services/cuentas.service';
import { ModalCuentaComponent } from '../components/modal-cuenta/modal-cuenta.component';
import { ModalMovimientoComponent } from '../components/modal-movimiento/modal-movimiento.component';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { cuenta } from '../core/interfaces/cuenta';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modalCtrl: ModalController, private movimientoService: MovimientosService, private cuentaService: CuentasService,
    public alertController: AlertController, movimientosService: MovimientosService, cuentasService: CuentasService) 
    {
      // this.getMovimientos()
      // this.getCuentas();
    }

  searchTerm: string;
  movimientos = []
  cuentas: cuenta[] = []

  ngOnInit(){
    this.getMovimientos()
    this.getCuentas()
    // this.addLabels()
   }
   
  async getMovimientos() {
    this.movimientos = await this.movimientoService.getMovimientos()
    // console.table(this.movimientos)
  }

  async getCuentas() {
    this.cuentas = await this.cuentaService.getCuentas()
    for (let cuenta of this.cuentas) {
      this.doughnutChartLabels.push(cuenta.nombre)
      // this.doughnutChartData.datasets[0].data.push(Number(cuenta.saldo))
      console.log(cuenta.nombre)
      console.table(this.doughnutChartData.datasets[0].data);
    }
    console.log(this.doughnutChartLabels);
    // console.table(this.cuentas)
  }

  // addLabels() {
  //   for (let cuenta of this.cuentas) {
  //     this.doughnutChartLabels.push(cuenta.nombre)
  //     console.log(cuenta.nombre);
  //   }
  //   console.log(this.cuentas);
  // }

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

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [200,100] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
