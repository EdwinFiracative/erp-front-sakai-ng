//import { Component } from '@angular/core';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
import { ViewErpPedidoHeaderDto } from '@/models/pedidosfull';
import { PedidosServiceTabla } from '@/app/services/pedido-table-service';
import {ObjectUtils} from "primeng/utils";
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, finalize, shareReplay, take } from 'rxjs/operators';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-pedido.table.component',
    standalone: true,
    imports: [TableModule,
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
        IconFieldModule],
    templateUrl: './pedido.table.component.html',
    //styleUrl: './pedido.table.component.scss'
    styles: `
        .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        .p-datatable-scrollable .p-frozen-column {
            font-weight: bold;
        }
    `,
    providers: [ConfirmationService, MessageService, CustomerService, PedidosServiceTabla]
})
export class PedidoTableComponent implements OnInit {
    
    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    pedidos$: Observable<ViewErpPedidoHeaderDto[]> = of([]);
     private readonly pedidoService = inject(PedidosServiceTabla);
     private readonly messageService = inject(MessageService);

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    balanceFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private customerService: CustomerService,
        
    ) {}

    ngOnInit() {
                this.pedidos$ = this.pedidoService.getPedidos().pipe(
                    catchError((error: HttpErrorResponse) => {
                        this.handlePedidosError(error);
                        return of([]);
                    }),
                    finalize(() => {
                        this.loading = false;
                    }),
                    shareReplay(1)

                );

    }

    private handlePedidosError(error: HttpErrorResponse): void {
        let summary = 'Error';
        let detail = 'Ocurrió un error al cargar los pedidos.';

        switch (error.status) {
            case 0:
                summary = 'Sin conexión';
                detail = 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
                break;
            case 400:
                summary = 'Solicitud inválida';
                detail = 'La solicitud enviada no es válida.';
                break;
            case 401:
                summary = 'No autorizado';
                detail = 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.';
                break;
            case 403:
                summary = 'Acceso denegado';
                detail = 'No tiene permisos para consultar los pedidos.';
                break;
            case 404:
                summary = 'No encontrado';
                detail = 'No se encontraron pedidos.';
                break;
            case 408:
            case 504:
                summary = 'Tiempo de espera agotado';
                detail = 'El servidor tardó demasiado en responder. Intente nuevamente.';
                break;
            case 500:
                summary = 'Error del servidor';
                detail = 'Ocurrió un error interno en el servidor. Intente más tarde.';
                break;
            case 502:
            case 503:
                summary = 'Servicio no disponible';
                detail = 'El servicio no está disponible en este momento. Intente más tarde.';
                break;
            default:
                detail = `Error inesperado (código ${error.status}).`;
        }

        this.messageService.add({ severity: 'error', summary, detail });
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    } else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if(ObjectUtils.isEmpty(this.expandedRows)) {
            this.pedidos$.pipe(take(1)).subscribe((pedidos) => {
                this.expandedRows = pedidos.reduce(
                    (acc, p) => {
                        if (p.num) {
                            acc[p.num] = true;
                        }
                        return acc;
                    },
                    {} as { [key: string]: boolean }
                );
                this.isExpanded = true;
            });
        } else {
            this.collapseAll()
        }

    }

    collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
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

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.customers2) {
            for (let customer of this.customers2) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }

        return total;
    }
}
