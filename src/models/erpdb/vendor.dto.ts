import { ThirdPartyDto } from './third-party.dto';

export interface VendorDto {
  vendorId?: number | null;
  vendorThirdParty?: ThirdPartyDto | null;
  vendorCode?: string | null;
}
