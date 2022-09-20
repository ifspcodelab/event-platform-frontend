import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListPrintComponent } from './session-list-print.component';

describe('SessionListPrintComponent', () => {
  let component: SessionListPrintComponent;
  let fixture: ComponentFixture<SessionListPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionListPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
