import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';         //HAY QUE IMPORTAR EL HttpClient
import { Observable } from 'rxjs/internal/Observable';     //HAY QUE IMPORTAR EL OBSERVABLE

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  constructor() {}

  //falta getmovimientoporid
  
  async getMovimientos() {
    const res = await fetch('http://localhost:8080/movimiento');
    const resjson = (await res).json()
    return resjson
  }

  //URL = 'http://localhost:8080/movimiento/'; //HAY QUE AGREGAR LA / AL FINAL

  //constructor(private http:HttpClient) { }

  //getMovimiento(): Observable<movimiento> {
  //  return this.http.get<movimiento>(this.URL);
  //}

  async addMovimientos(nuevo_movimiento) {
    const res = await fetch('http://localhost:8080/movimiento', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(nuevo_movimiento)
    });
    const resjson = (await res).json()
    return resjson
  }

}
