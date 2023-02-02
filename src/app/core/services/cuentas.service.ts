import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor() {}

  async getCuentas() {
    const res = await fetch('http://localhost:8080/cuenta');
    const resjson = (await res).json()
    return resjson
  }

  async getCuentaByNombre(nombre: string) {
    const res = await fetch('http://localhost:8080/cuenta/query?nombre=' + nombre);
    const resjson = (await res).json()
    return resjson
  }

  async getCuentaById(id: number) {
    const res = await fetch('http://localhost:8080/cuenta/' + id);
    const resjson = (await res).json()
    return resjson
  }

  async addCuentas(nueva_cuenta) {
    const res = await fetch('http://localhost:8080/cuenta', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(nueva_cuenta)
    });
    const resjson = (await res).json()
    return resjson
  }
}
