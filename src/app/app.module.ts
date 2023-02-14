import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalMovimientoComponent } from './components/modal-movimiento/modal-movimiento.component';
import { ModalCuentaComponent } from './components/modal-cuenta/modal-cuenta.component';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [AppComponent, ModalMovimientoComponent, ModalCuentaComponent],
  imports: [
    BrowserModule, 
    FormsModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
