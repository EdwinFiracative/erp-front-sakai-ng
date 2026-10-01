import { ThirdPartyDto } from './third-party.dto';

export interface ClientDto {
  clientId?: number | null;
  clientThirdParty?: ThirdPartyDto | null;
}
