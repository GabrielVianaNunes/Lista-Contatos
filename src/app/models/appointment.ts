export interface Appointment {
  id: number;
  title: string;
  description: string;
  dateTime: string; // ISO string
  location: string;
  contactId: number; // ID do contato associado
}
