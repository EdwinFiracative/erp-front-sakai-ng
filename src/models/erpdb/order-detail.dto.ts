// Notas del pedido. La cabecera y las lineas estan en order-header.dto.ts (GET /api/orderheader).
export interface OrderDetailNoteDto {
  orderNoteId?: number | null;
  orderNotePosition?: number | null;
  orderNoteText?: string | null;
}
