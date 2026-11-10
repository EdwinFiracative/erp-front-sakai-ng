import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS } from '../../app.settings';
import { OrderHeaderDto } from '../../models/erpdb';

@Injectable({
    providedIn: 'root'
})
export class OrderDetailService {
    private http = inject(HttpClient);
    private settings = inject(APP_SETTINGS);
    private apiUrl = `${this.settings.apiUrl}/api/orderheader`;

    // Fechas en formato yyyy-MM-dd (ambas incluidas). "estados" son ids de OrderReferStatus:
    // si se envian, el backend devuelve solo pedidos con lineas en esos estados y solo esas lineas.
    getOrderHeaders(fechaInicial: string, fechaFinal: string, estados?: number[]): Observable<OrderHeaderDto[]> {
        let params = new HttpParams().set('fechaInicial', fechaInicial).set('fechaFinal', fechaFinal);
        if (estados?.length) {
            params = params.set('estados', estados.join(','));
        }
        return this.http.get<OrderHeaderDto[]>(this.apiUrl, { params });
    }

    getOrderHeaderByNumber(num: number): Observable<OrderHeaderDto> {
        return this.http.get<OrderHeaderDto>(`${this.apiUrl}/${num}`);
    }
}
