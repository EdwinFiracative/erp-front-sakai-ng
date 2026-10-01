import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { ObjectUtils } from 'primeng/utils';
import { Observable, of } from 'rxjs';
import { catchError, finalize, shareReplay, take } from 'rxjs/operators';
import { OrderDetailDto } from '@/models/erpdb';
import { OrderDetailService } from '@/app/services/order-detail-service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-order-detail',
    standalone: true,
    imports: [TableModule, InputIconModule, TagModule, InputTextModule, CommonModule, FormsModule, ButtonModule, RippleModule, IconFieldModule],
    templateUrl: './order.detail.component.html'
})
export class OrderDetailComponent implements OnInit {
    private readonly orderDetailService = inject(OrderDetailService);

    orders$: Observable<OrderDetailDto[]> = of([]);

    expandedRows: expandedRows = {};

    isExpanded: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    ngOnInit() {
        this.orders$ = this.orderDetailService.getOrderDetails(270, 0, 1000, 'orderHeaderNumber,desc').pipe(
            catchError(() => of([])),
            finalize(() => {
                this.loading = false;
            }),
            shareReplay(1)
        );
    }

    expandAll() {
        if (ObjectUtils.isEmpty(this.expandedRows)) {
            this.orders$.pipe(take(1)).subscribe((orders) => {
                this.expandedRows = orders.reduce(
                    (acc, o) => {
                        if (o.orderHeaderId != null) {
                            acc[o.orderHeaderId] = true;
                        }
                        return acc;
                    },
                    {} as { [key: string]: boolean }
                );
                this.isExpanded = true;
            });
        } else {
            this.collapseAll();
        }
    }

    collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getSeverity(status: string | null | undefined) {
        switch (status) {
            case 'A':
                return 'success';
            case 'P':
                return 'warn';
            case 'C':
            case 'R':
                return 'danger';
            default:
                return 'info';
        }
    }
}
