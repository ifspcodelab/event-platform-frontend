import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationResendEmailComponent } from './registration-resend-email.component';

describe('RegistrationResendEmailComponent', () => {
  let component: RegistrationResendEmailComponent;
  let fixture: ComponentFixture<RegistrationResendEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationResendEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationResendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
