import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  contact: Contact | undefined;
  contactCopy: Omit<Contact, 'id'> = { name: '', email: '', phone: '' };

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contact = this.contactService.getContactById(id);
    if (this.contact) {
      this.contactCopy = { name: this.contact.name, email: this.contact.email, phone: this.contact.phone };
    }
  }

  salvarEdicao() {
    if (this.contact) {
      this.contactService.updateContact(this.contact.id, this.contactCopy);
      this.router.navigate(['/contatos']);
    }
  }
}