import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordResendEmailComponent } from './forgot-password-resend-email.component';

describe('ForgotPasswordResendEmailComponent', () => {
  let component: ForgotPasswordResendEmailComponent;
  let fixture: ComponentFixture<ForgotPasswordResendEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordResendEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordResendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
