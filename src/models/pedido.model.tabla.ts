export interface Cliente {
  COD: string;
  NOM: string;
  DIR: string;
  CIU: string;
}

export interface Vendedor {
  COD: number;
  NOM: string;
}

export interface Referencia {
  COD: string;
  NOM: string;
  CANT: number;
  COSTO: number;
}

export interface Nota {
  COD: string;
  NOM: string;
}

export interface PedidoTabla {
  NUM: number;
  FECHA: string; // ISO 8601 string
  CLIENTES: Cliente;
  VENDEDOR: Vendedor;
  referencias: Referencia[];
  notas: Nota[];
}