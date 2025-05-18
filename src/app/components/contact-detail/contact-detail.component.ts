import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { GroupService } from '../../services/group.service';
import { Contact } from '../../models/contact';
import { Observable } from 'rxjs';

interface Group {
  id: number;
  name: string;
}

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  contact: Contact | undefined;
  contactCopy: Omit<Contact, 'id'> = {
    name: '',
    email: '',
    phone: '',
    isFavorite: false,
    groups: []
  };

  allGroups$: Observable<Group[]>;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private groupService: GroupService,
    private router: Router
  ) {
    this.allGroups$ = this.groupService.getGroups(); // Agora retorna Observable<Group[]>
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContactById(id).subscribe(contact => {
      this.contact = contact;
      this.contactCopy = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        isFavorite: contact.isFavorite ?? false,
        groups: contact.groups ?? []
      };
    });
  }

  salvarEdicao() {
    if (this.contact) {
      this.contactService.updateContact(this.contact.id, this.contactCopy).subscribe(() => {
        this.router.navigate(['/contatos']);
      });
    }
  }

  toggleGroup(groupName: string) {
    const index = this.contactCopy.groups?.indexOf(groupName) ?? -1;
    if (index === -1) {
      this.contactCopy.groups?.push(groupName);
    } else {
      this.contactCopy.groups?.splice(index, 1);
    }
  }

  isGroupSelected(groupName: string): boolean {
    return this.contactCopy.groups?.includes(groupName) ?? false;
  }
}
