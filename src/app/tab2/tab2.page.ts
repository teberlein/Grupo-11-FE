import { Component, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { MovimientosService } from '../core/services/movimientos.service';
import { CuentasService } from '../core/services/cuentas.service';
import { ModalCuentaComponent } from '../components/modal-cuenta/modal-cuenta.component';
import { ModalMovimientoComponent } from '../components/modal-movimiento/modal-movimiento.component';
import { Chart, registerables, ChartData, ChartEvent, ChartType } from 'chart.js/auto';
import { cuenta } from '../core/interfaces/cuenta';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private modalCtrl: ModalController, private movimientoService: MovimientosService, private cuentaService: CuentasService,
    public alertController: AlertController, movimientosService: MovimientosService, cuentasService: CuentasService) 
    {
      Chart.register(...registerables)
    }

  searchTerm: string;
  movimientos = []
  cuentas: cuenta[] = []

  ngOnInit(){
    this.getCuentas()
   }

  async getCuentas() {
    this.cuentas = await this.cuentaService.getCuentas()
    for (let cuenta of this.cuentas) {
      this.doughnutChartLabels.push(cuenta.nombre)
      this.doughnutChartData.datasets[0].data.push(Number(cuenta.saldo))
    }
    this.chart?.update()
    this.chart?.render();
  }

   public doughnutChartLabels: string[] = [];
   public doughnutChartData: ChartData = {
     labels: this.doughnutChartLabels,
     datasets: [
       {
         data: [],
         label: 'Saldo',
        //  backgroundColor: [
        //   'red',
        //   'pink',
        //   'green',
        //   'yellow',
        //   'orange',
        //   'blue',			
        // ],
       }
     ]
   };
   public chartOptions = {
    responsive: true
  };
   public doughnutChartType: ChartType = 'doughnut';

  //events
   public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
     console.log(event, active);
   }
  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
     console.log(event, active);
   }

   async modalMovimiento() {
    const modal = await this.modalCtrl.create({
      component: ModalMovimientoComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss()
    this.chart?.update()
    this.chart?.render();
  }

  async modalCuenta() {
    const modal = await this.modalCtrl.create({
      component: ModalCuentaComponent,
    });
 modal.present();

 const { data, role } = await modal.onWillDismiss()
  this.chart?.update()
  this.chart?.render();
 }
}