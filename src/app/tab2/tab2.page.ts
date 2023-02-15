import { Component, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { MovimientosService } from '../core/services/movimientos.service';
import { CuentasService } from '../core/services/cuentas.service';
import { ModalCuentaComponent } from '../components/modal-cuenta/modal-cuenta.component';
import { ModalMovimientoComponent } from '../components/modal-movimiento/modal-movimiento.component';
import { Chart, registerables, ChartData, ChartEvent, ChartType } from 'chart.js/auto';
import { cuenta } from '../core/interfaces/cuenta';
import { BaseChartDirective } from 'ng2-charts';
import { ToastService } from '../core/services/toast.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private modalCtrl: ModalController, private movimientoService: MovimientosService, private cuentaService: CuentasService,
    public alertController: AlertController, movimientosService: MovimientosService, cuentasService: CuentasService, private ts:ToastService) 
    {
      Chart.register(...registerables)
    }

  searchTerm: string;
  movimientos = []
  cuentas: cuenta[] = []
  saldoTotal: number = 0

  // async ngOnInit(){
  //   Chart.register(...registerables)
  //   this.cuentas = []
  //   this.doughnutChartData.labels = []
  //   this.doughnutChartData.datasets[0].data = []
  //   await this.getCuentas()
  //  }

   async ionViewWillEnter() {
      Chart.register(...registerables)
      console.log('ionViewWillEnter')
      this.saldoTotal = 0
      this.cuentas = []
      this.doughnutChartData.labels = []
      this.doughnutChartData.datasets[0].data = []
      await this.getCuentas()
    }

  async getCuentas() {
    this.cuentas = await this.cuentaService.getCuentas()
    for (let cuenta of this.cuentas) {
      this.doughnutChartData.labels.push(cuenta.nombre)
      this.doughnutChartData.datasets[0].data.push(Number(cuenta.saldo))
      this.saldoTotal = Number(this.saldoTotal) + Number(cuenta.saldo)
      console.log(this.saldoTotal)
      // console.log (cuenta.nombre)
    }
    this.chart?.update()
    this.chart?.render();
  }

  //  public doughnutChartLabels: string[] = [];
   public doughnutChartData: ChartData = {
     labels: [],
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
    if(this.cuentas.length == 0){
      console.log (false)
      const alert = await this.alertController.create({
        header: 'Para anadir un movimiento primero debe añadir una cuenta',
        buttons: ['OK'],
      });
  
      await alert.present();
    }

    else if (this.cuentas.length > 0)
    {const modal = await this.modalCtrl.create
      ({
        component: ModalMovimientoComponent,
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();
      console.log(this.cuentas.length)
      this.saldoTotal = 0
      this.doughnutChartData.labels = []
      this.doughnutChartData.datasets[0].data = []
      await this.getCuentas();
      this.ts.presentToast("El movimiento se agregó con éxito.");
    }
  }

  async modalCuenta() {
    const modal = await this.modalCtrl.create({
      component: ModalCuentaComponent,
    });
 modal.present();

 const { data, role } = await modal.onWillDismiss()
    this.cuentas = []
    this.saldoTotal = 0
    this.doughnutChartData.labels = []
    this.doughnutChartData.datasets[0].data = []
    await this.getCuentas();
    this.ts.presentToast("La cuenta se agregó con éxito.");
 }

  handleRefresh(event) {
  setTimeout(async () => {
    // console.log('actualizando')
    this.cuentas = []
    this.saldoTotal = 0
    this.doughnutChartData.labels = []
    this.doughnutChartData.datasets[0].data = []
    await this.getCuentas()
    event.target.complete();
  }, 500);
};
}