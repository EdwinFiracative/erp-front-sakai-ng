import { MeasurUnitDto } from './measur-unit.dto';

export interface ReferenceDto {
  referId?: number | null;
  referCod?: string | null;
  referCod2?: string | null;
  referName?: string | null;
  referDescription?: string | null;
  referMeasuUnit?: MeasurUnitDto | null;
}
