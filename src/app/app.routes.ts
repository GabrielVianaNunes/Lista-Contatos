import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contatos', pathMatch: 'full' },
  { 
    path: 'contatos', 
    loadComponent: () => import('./components/contact-list/contact-list.component')
      .then(m => m.ContactListComponent) 
  },
  { 
    path: 'adicionar', 
    loadComponent: () => import('./components/contact-form/contact-form.component')
      .then(m => m.ContactFormComponent) 
  },
  { 
    path: 'editar/:id', 
    loadComponent: () => import('./components/contact-detail/contact-detail.component')
      .then(m => m.ContactDetailComponent) 
  },
  {
    path: 'grupos',
    loadComponent: () => import('./components/contact-groups/contact-groups.component')
      .then(m => m.ContactGroupsComponent)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./components/contact-favorites/contact-favorites.component')
      .then(m => m.ContactFavoritesComponent)
  }
];
