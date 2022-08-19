import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDataEditComponent } from './my-data-edit.component';

describe('MyDataEditComponent', () => {
  let component: MyDataEditComponent;
  let fixture: ComponentFixture<MyDataEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDataEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
