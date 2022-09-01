import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupResendEmailComponent } from './signup-resend-email.component';

describe('RegistrationResendEmailComponent', () => {
  let component: SignupResendEmailComponent;
  let fixture: ComponentFixture<SignupResendEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupResendEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupResendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
