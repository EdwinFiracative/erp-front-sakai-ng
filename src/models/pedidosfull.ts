// vendedor.dto.ts
export interface VendedorDto {
  id?: number | null;
  cod?: string | null;
  nom?: string | null;
}
// view-erp-pedido-note.dto.ts
export interface ViewErpPedidoNoteDto {
  id?: number | null;
  cod?: string | null;
  nom?: string | null;
}

// referencia-basic.dto.ts (dependency used by ViewErpPedidoReferenceDto)
export interface ReferenciaBasicDto {
  cod?: string | null;
  exist?: number | null;
  cstd?: number | null;
}
// view-erp-pedido-reference.dto.ts
// import { ReferenciaBasicDto } from './referencia-basic.dto';

export interface ViewErpPedidoReferenceDto {
  id?: number | null;
  pos?: number | null;
  cod?: ReferenciaBasicDto | null;
  nom?: string | null;
  ud?: string | null;
  cant?: number | null;
  costo?: number | null;
  pend?: number | null;
  estado?: string | null; // Java Character
  neto?: number | null;
  entrega?: string | null; // ISO datetime from Instant
  factoryId?: number | null;
}

// cliente.dto.ts (dependency used by ViewErpPedidoHeaderDto)
export interface ClienteDto {
  id?: number | null;
  cod?: string | null;
  nom?: string | null;
  dir?: string | null;
  ciu?: string | null;
  depto?: string | null;
  nit?: string | null;
  dist?: string | null;
  condic?: string | null;
  cupo?: number | null;
  zona?: string | null;
  ncod?: string | null;
}
// // view-erp-pedido-header.dto.ts
// import { ClienteDto } from './cliente.dto';
// import { VendedorDto } from './vendedor.dto';
// import { ViewErpPedidoReferenceDto } from './view-erp-pedido-reference.dto';
// import { ViewErpPedidoNoteDto } from './view-erp-pedido-note.dto';

export interface ViewErpPedidoHeaderDto {
  num?: string | null;
  oferta?: string | null;
  proyecto?: string | null;
  cliente?: ClienteDto | null;
  fecha?: string | null; // ISO datetime from Instant
  vendedor?: VendedorDto | null;
  orden?: string | null;
  ncod?: string | null;
  detalle?: string | null;
  condic?: string | null;
  factoryId?: number | null;
  references?: ViewErpPedidoReferenceDto[] | null;
  notes?: ViewErpPedidoNoteDto[] | null;
}