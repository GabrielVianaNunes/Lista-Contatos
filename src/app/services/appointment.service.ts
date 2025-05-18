import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentsByContact(contactId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}?contactId=${contactId}`);
  }

  addAppointment(appointment: Omit<Appointment, 'id'>): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
