import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'contatos', pathMatch: 'full' },
  { path: 'contatos', loadComponent: () => import('./components/contact-list/contact-list.component').then(m => m.ContactListComponent) },
  { path: 'adicionar', loadComponent: () => import('./components/contact-form/contact-form.component').then(m => m.ContactFormComponent) },
  { path: 'editar/:id', loadComponent: () => import('./components/contact-detail/contact-detail.component').then(m => m.ContactDetailComponent) }
];
