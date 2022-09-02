import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDataAlterPasswordComponent } from './my-data-alter-password.component';

describe('MyDataAlterPasswordComponent', () => {
  let component: MyDataAlterPasswordComponent;
  let fixture: ComponentFixture<MyDataAlterPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDataAlterPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDataAlterPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
