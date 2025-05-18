import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { GroupService } from '../../services/group.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact: Omit<Contact, 'id'> = {
    name: '',
    email: '',
    phone: '',
    groups: [],
    isFavorite: false
  };

  gruposDisponiveis: { id: number; name: string }[] = [];

  constructor(
    private contactService: ContactService,
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe({
      next: grupos => this.gruposDisponiveis = grupos,
      error: err => console.error('Erro ao carregar grupos:', err)
    });
  }

  adicionarContato(): void {
    if (this.contact.name && this.contact.email && this.contact.phone) {
      this.contactService.addContact({ ...this.contact }).subscribe({
        next: () => this.router.navigate(['/contatos']),
        error: err => console.error('Erro ao adicionar contato:', err)
      });
    }
  }

  alternarGrupo(grupo: string): void {
    const index = this.contact.groups?.indexOf(grupo);
    if (index === -1 || index === undefined) {
      this.contact.groups?.push(grupo);
    } else {
      this.contact.groups?.splice(index, 1);
    }
  }

  grupoSelecionado(grupo: string): boolean {
    return this.contact.groups?.includes(grupo) ?? false;
  }
}
