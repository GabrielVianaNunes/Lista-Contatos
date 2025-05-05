import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private nextId: number = 1; // contador de ID único e incremental

  constructor() {}

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(contact: Omit<Contact, 'id'>): void {
    const newContact: Contact = {
      ...contact,
      id: this.nextId++
    };
    this.contacts.push(newContact);
  }

  removeContact(index: number): void {
    this.contacts.splice(index, 1);
  }

  getContactByIndex(index: number): Contact | undefined {
    return this.contacts[index];
  }
}
