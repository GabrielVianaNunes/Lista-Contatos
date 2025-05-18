export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  groups?: string[];       // novo campo: lista de grupos associados
  isFavorite?: boolean;    // novo campo: se é favorito ou não
}
