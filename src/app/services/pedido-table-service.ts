import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_SETTINGS } from '../../app.settings'; 
import { Observable } from 'rxjs';
import { ViewErpPedidoHeaderDto } from '../../models/pedidosfull';
//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosServiceTabla {
  private http = inject(HttpClient);
      private settings = inject(APP_SETTINGS);
      private apiUrl = `${this.settings.apiUrl}/api/pedido/filtererp?page=0&size=100&sort=num,desc`; // Ajusta la URL según tu configuración de API
      // TODO: apunta temporalmente al mock local para pruebas; volver a `this.apiUrl` cuando el backend este disponible.
      private mockUrl = 'response2.json';



  getPedidos(): Observable<ViewErpPedidoHeaderDto[]> {
          return this.http.post<ViewErpPedidoHeaderDto[]>(this.apiUrl, { fechaAfter: "2026-01-01T00:00:00Z" });
      }

  /*getPedidoPorId(num: number): Observable<PedidoTabla> {
    return this.http.get<PedidoTabla>(`${this.apiUrl}/${num}`);
  }*/
}