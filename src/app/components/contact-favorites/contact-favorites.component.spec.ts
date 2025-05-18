import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFavoritesComponent } from './contact-favorites.component';

describe('ContactFavoritesComponent', () => {
  let component: ContactFavoritesComponent;
  let fixture: ComponentFixture<ContactFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
