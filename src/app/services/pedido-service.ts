import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS } from '../../app.settings';

import { Pedido } from '../../models/pedido';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private http = inject(HttpClient);
    private settings = inject(APP_SETTINGS);
    private apiUrl = `${this.settings.apiUrl}/api/pedido/filter`;

    listPedidos(): Observable<Pedido[]> {
        return this.http.post<Pedido[]>(this.apiUrl, { fechaAfter: "2026-01-01T00:00:00Z" });
    }
}
