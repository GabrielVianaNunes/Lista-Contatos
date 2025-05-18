import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { ContactService } from '../../services/contact.service';
import { Appointment } from '../../models/appointment';
import { Contact } from '../../models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointment: Omit<Appointment, 'id'> = {
    title: '',
    description: '',
    dateTime: '',
    location: '',
    contactId: 0
  };

  contacts: Contact[] = [];
  erro: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: contatos => this.contacts = contatos,
      error: err => console.error('Erro ao carregar contatos:', err)
    });
  }

  salvar(): void {
  const agora = new Date();
  const dataHora = new Date(this.appointment.dateTime);

  if (dataHora <= agora) {
    this.erro = 'A data e hora devem ser futuras.';
    return;
  }

  // (Futuramente) validar conflito de horário
  const conflito = false;

  if (conflito) {
    this.erro = 'Esse contato já tem um compromisso nesse horário.';
    return;
  }

  this.appointmentService.addAppointment(this.appointment).subscribe({
    next: () => this.router.navigate(['/compromissos']),
    error: err => {
      console.error('Erro ao salvar compromisso:', err);
      this.erro = 'Erro ao salvar compromisso.';
    }
  });
}
}
