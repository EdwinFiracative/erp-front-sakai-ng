import { BranchDto } from './branch.dto';
import { ReferenceDto } from './reference.dto';
import { VendorDto } from './vendor.dto';

export interface OrderDetailNoteDto {
  orderNoteId?: number | null;
  orderNotePosition?: number | null;
  orderNoteText?: string | null;
}

export interface OrderDetailReferenceDto {
  orderReferId?: number | null;
  orderReferPosition?: number | null;
  orderReferReference?: ReferenceDto | null;
  orderReferQuantity?: number | null;
  orderReferUnitPrice?: number | null; // Java BigDecimal
  valorTotal?: number | null; // cantidad * valor unitario (sin impuestos); no existe en la base
  orderReferApproState?: string | null;
  orderReferDelivDate?: string | null; // ISO date (yyyy-MM-dd) from LocalDate
}

export interface OrderDetailDto {
  orderHeaderId?: number | null;
  orderHeaderNumber?: number | null;
  orderHeaderDate?: string | null; // ISO date (yyyy-MM-dd) from LocalDate
  orderHeaderProject?: string | null;
  orderHeaderPaymeConditions?: string | null;
  orderHeaderDescription?: string | null;
  orderHeaderBranch?: BranchDto | null;
  orderHeaderVendor?: VendorDto | null; // vendedor del pedido; si no tiene, el de la sede
  orderReference?: OrderDetailReferenceDto[] | null;
  orderNote?: OrderDetailNoteDto[] | null;
}
