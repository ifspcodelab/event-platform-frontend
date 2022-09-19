import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRegistrationFormComponent } from './session-registration-form.component';

describe('SessionRegistrationFormComponent', () => {
  let component: SessionRegistrationFormComponent;
  let fixture: ComponentFixture<SessionRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionRegistrationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
