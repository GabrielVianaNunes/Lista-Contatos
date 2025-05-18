import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { GroupService } from '../../services/group.service';
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
  grupoSelecionado: string = '';
  contacts: Contact[] = [];
  grupos: string[] = [];

  constructor(
    private contactService: ContactService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.carregarContatos();
    this.carregarGrupos();
  }

  carregarContatos(): void {
    this.contactService.getContacts().subscribe({
      next: (dados) => (this.contacts = dados),
      error: (erro) => console.error('Erro ao carregar contatos:', erro)
    });
  }

  carregarGrupos(): void {
    this.groupService.getGroups().subscribe({
      next: (dados) => (this.grupos = dados.map(g => g.name)),
      error: (erro) => console.error('Erro ao carregar grupos:', erro)
    });
  }

  get contatosFiltrados(): Contact[] {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.filtro.toLowerCase()) &&
      (!this.grupoSelecionado || contact.groups?.includes(this.grupoSelecionado))
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

  alternarFavorito(contato: Contact): void {
    const atualizado = {
      ...contato,
      isFavorite: !contato.isFavorite
    };
    this.contactService.updateContact(contato.id, atualizado).subscribe({
      next: () => this.carregarContatos(),
      error: (erro) => console.error('Erro ao atualizar favorito:', erro)
    });
  }
}
