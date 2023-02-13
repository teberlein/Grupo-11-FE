import { Injectable } from '@angular/core';

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

  async getMovimientosPorCuenta(cuenta) {
    const res = await fetch('http://localhost:8080/movimiento/query?cuenta=' + cuenta);
    const resjson = (await res).json()
    return resjson
  }

  async getMovimientoPorId(id: number) {
    const res = await fetch('http://localhost:8080/movimiento/' + id);
    const resjson = (await res).json()
    return resjson
  }

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

  async borrarMovimiento(id: number) {
    const res = await fetch('http://localhost:8080/movimiento/' + id, {
      method: 'DELETE', 
    });
    const resjson = (await res)
    return resjson
  }

}
