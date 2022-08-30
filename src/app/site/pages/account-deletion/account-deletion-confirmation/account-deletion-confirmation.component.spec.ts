import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeletionConfirmationComponent } from './account-deletion-confirmation.component';

describe('AccountDeletionConfirmationComponent', () => {
  let component: AccountDeletionConfirmationComponent;
  let fixture: ComponentFixture<AccountDeletionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDeletionConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDeletionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
