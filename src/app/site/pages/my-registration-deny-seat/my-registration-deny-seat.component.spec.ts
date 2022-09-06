import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegistrationDenySeatComponent } from './my-registration-deny-seat.component';

describe('MyRegistrationDenySeatComponent', () => {
  let component: MyRegistrationDenySeatComponent;
  let fixture: ComponentFixture<MyRegistrationDenySeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRegistrationDenySeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRegistrationDenySeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
