import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_SETTINGS } from '../../app.settings'; 
import { Observable } from 'rxjs';
import { PedidoTabla } from '../../models/pedido.model.tabla';
//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosServiceTabla {
  private http = inject(HttpClient);
      private settings = inject(APP_SETTINGS);
      private apiUrl = `${this.settings.apiUrl}/api/pedido/tabla`;
      // TODO: apunta temporalmente al mock local para pruebas; volver a `this.apiUrl` cuando el backend este disponible.
      private mockUrl = 'datos_100_filas.json';

  getPedidos(): Observable<PedidoTabla[]> {
    return this.http.get<PedidoTabla[]>(this.mockUrl);
  }

  /*getPedidoPorId(num: number): Observable<PedidoTabla> {
    return this.http.get<PedidoTabla>(`${this.apiUrl}/${num}`);
  }*/
}