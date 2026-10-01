import { ClientDto } from './client.dto';

export interface BranchDto {
  branchId?: number | null;
  branchCode?: string | null;
  branchCity?: string | null;
  branchAddress?: string | null;
  branchClient?: ClientDto | null;
}
