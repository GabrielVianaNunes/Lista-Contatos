import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  filtro: string = '';
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(): void {
    this.contactService.getContacts().subscribe({
      next: (dados) => (this.contacts = dados),
      error: (erro) => console.error('Erro ao carregar contatos:', erro)
    });
  }

  get contatosFiltrados(): Contact[] {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  remover(index: number): void {
    const contato = this.contatosFiltrados[index];
    if (contato) {
      this.contactService.deleteContact(contato.id).subscribe({
        next: () => this.carregarContatos(),
        error: (erro) => console.error('Erro ao remover contato:', erro)
      });
    }
  }
}
