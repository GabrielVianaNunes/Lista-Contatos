import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private nextId = 1;

  constructor() {}

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  addContact(contact: Omit<Contact, 'id'>): void {
    const newContact: Contact = {
      id: this.nextId++,
      ...contact
    };
    this.contacts.push(newContact);
  }

  removeContact(index: number): void {
    this.contacts.splice(index, 1);
  }

  updateContact(id: number, updated: Omit<Contact, 'id'>): void {
    const contact = this.getContactById(id);
    if (contact) {
      contact.name = updated.name;
      contact.email = updated.email;
      contact.phone = updated.phone;
    }
  }
}
