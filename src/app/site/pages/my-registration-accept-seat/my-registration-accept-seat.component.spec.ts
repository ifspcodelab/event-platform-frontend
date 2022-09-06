import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegistrationAcceptSeatComponent } from './my-registration-accept-seat.component';

describe('MyRegistrationAcceptSeatComponent', () => {
  let component: MyRegistrationAcceptSeatComponent;
  let fixture: ComponentFixture<MyRegistrationAcceptSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRegistrationAcceptSeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRegistrationAcceptSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
