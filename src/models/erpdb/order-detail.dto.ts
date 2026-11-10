import { BranchDto } from './branch.dto';
import { OrderReferStatusDto } from './order-refer-status.dto';
import { ProjectDto } from './project.dto';
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
  orderReferDelivDate?: string | null; // ISO date (yyyy-MM-dd) from LocalDate
  orderReferProject?: ProjectDto | null; // proyecto de la linea; null si no tiene
  orderReferStatus?: OrderReferStatusDto | null;
}

export interface OrderHeaderDto {
  orderHeaderId?: number | null;
  orderHeaderNumber?: number | null;
  orderHeaderDate?: string | null; // ISO date (yyyy-MM-dd) from LocalDate
  orderHeaderPaymeConditions?: string | null;
  orderHeaderDescription?: string | null;
  orderHeaderBranch?: BranchDto | null;
  orderHeaderVendor?: VendorDto | null; // vendedor del pedido; si no tiene, el de la sede
  orderReference?: OrderDetailReferenceDto[] | null;
  orderNote?: OrderDetailNoteDto[] | null;
}
