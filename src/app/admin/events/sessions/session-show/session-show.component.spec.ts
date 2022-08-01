import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionShowComponent } from './session-show.component';

describe('SessionShowComponent', () => {
  let component: SessionShowComponent;
  let fixture: ComponentFixture<SessionShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
