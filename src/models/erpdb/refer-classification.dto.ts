export interface ReferClassificationDto {
  id?: number | null;
  referClassFather?: ReferClassificationDto | null;
  referClassName: string; // @NotNull, max 100
  referClassDescription?: string | null; // max 200
  referClassGroupFactory?: string | null; // max 11
}

export interface ReferClassificationSonsDto {
  id?: number | null;
  referClassName: string; // @NotNull, max 100
  referClassDescription?: string | null; // max 200
  referClassGroupFactory?: string | null; // max 11
  referClassificationSons?: ReferClassificationSonsDto[] | null; // Java Set
}
