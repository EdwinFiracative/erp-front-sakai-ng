import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS } from '../../app.settings';
import { OrderDetailDto } from '../../models/erpdb';

@Injectable({
    providedIn: 'root'
})
export class OrderDetailService {
    private http = inject(HttpClient);
    private settings = inject(APP_SETTINGS);
    private apiUrl = `${this.settings.apiUrl}/api/orderdetail`;

    // El backend limita size a 1000.
    getOrderDetails(dias = 300, page = 0, size = 1000, sort = 'orderHeaderNumber,desc'): Observable<OrderDetailDto[]> {
        const params = new HttpParams().set('dias', dias).set('page', page).set('size', size).set('sort', sort);
        return this.http.get<OrderDetailDto[]>(this.apiUrl, { params });
    }

    getOrderDetailByNumber(num: number): Observable<OrderDetailDto> {
        return this.http.get<OrderDetailDto>(`${this.settings.apiUrl}/api/orderdetailbynumber/${num}`);
    }
}
