import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegistrationComponent } from './my-registration.component';

describe('MyRegistrationComponent', () => {
  let component: MyRegistrationComponent;
  let fixture: ComponentFixture<MyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
