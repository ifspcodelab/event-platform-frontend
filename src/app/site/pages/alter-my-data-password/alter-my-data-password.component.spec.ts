import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterMyDataPasswordComponent } from './alter-my-data-password.component';

describe('AlterMyDataPasswordComponent', () => {
  let component: AlterMyDataPasswordComponent;
  let fixture: ComponentFixture<AlterMyDataPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterMyDataPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterMyDataPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
