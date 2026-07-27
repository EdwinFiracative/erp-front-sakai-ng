
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { Customer, CustomerService, Representative } from '@/app/pages/service/customer.service';
import { Product, ProductService } from '@/app/pages/service/product.service';
import {ObjectUtils} from "primeng/utils";
import { PedidoService } from '../../services/pedido-service';
import { Pedido } from '../../../models/pedido';
import { Observable, catchError, finalize, of, shareReplay } from 'rxjs';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-app.pedido.component',
    imports: [
        TableModule,
        MultiSelectModule,
        SelectModule,
        InputIconModule,
        TagModule,
        InputTextModule,
        SliderModule,
        ProgressBarModule,
        ToggleButtonModule,
        ToastModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        RatingModule,
        RippleModule,
        IconFieldModule
    ],
    templateUrl: './app.pedido.component.html',
    styleUrl: './app.pedido.component.scss'
})
export class AppPedidoComponent implements OnInit {

    pedidos$: Observable<Pedido[]> = of([]);
    private readonly pedidoService = inject(PedidoService);

    selectedPedidos: Pedido[] = [];

        // selectedCustomer: Customer = {};

        // representatives: Representative[] = [];

        // statuses: any[] = [];

        // products: Product[] = [];

        rowGroupMetadata: any;

        expandedRows: expandedRows = {};

        activityValues: number[] = [0, 100];

        isExpanded: boolean = false;

        balanceFrozen: boolean = false;

        loading: boolean = true;

        @ViewChild('filter') filter!: ElementRef;

    ngOnInit() {
        this.pedidos$ = this.pedidoService.listPedidos().pipe(
            catchError(() => of([])),
            finalize(() => {
                this.loading = false;
            }),
            shareReplay(1)
        );
    }








    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getSeverity(status: string) {
        switch (status) {
            case 'qualified':
            case 'instock':
            case 'INSTOCK':
            case 'DELIVERED':
            case 'delivered':
                return 'success';

            case 'negotiation':
            case 'lowstock':
            case 'LOWSTOCK':
            case 'PENDING':
            case 'pending':
                return 'warn';

            case 'unqualified':
            case 'outofstock':
            case 'OUTOFSTOCK':
            case 'CANCELLED':
            case 'cancelled':
                return 'danger';

            default:
                return 'info';
        }
    }

    }
