import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-favorites.component.html',
  styleUrls: ['./contact-favorites.component.css']
})
export class ContactFavoritesComponent implements OnInit {
  contatosFavoritos: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: (contatos) => {
        this.contatosFavoritos = contatos.filter(c => c.isFavorite);
      },
      error: (err) => console.error('Erro ao carregar favoritos:', err)
    });
  }
}
