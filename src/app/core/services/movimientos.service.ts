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

  async getMovimientosPorCategoria(categoria) {
    const res = await fetch('http://localhost:8080/movimiento/query?cuenta=' + categoria);
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

}
