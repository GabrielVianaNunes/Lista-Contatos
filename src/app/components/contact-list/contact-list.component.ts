import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import necessário
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ✅ Adiciona FormsModule aqui
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  filtro: string = '';
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  get contatosFiltrados(): Contact[] {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  remover(index: number): void {
    this.contactService.removeContact(index);
    this.contacts = this.contactService.getContacts();
  }
}
