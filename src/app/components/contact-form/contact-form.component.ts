import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  contact: Omit<Contact, 'id'> = { name: '', email: '', phone: '' };

  constructor(private contactService: ContactService) {}

  adicionarContato() {
    if (this.contact.name && this.contact.email && this.contact.phone) {
      this.contactService.addContact({ ...this.contact });
      this.contact = { name: '', email: '', phone: '' };
    }
  }
}
