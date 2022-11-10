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
}
