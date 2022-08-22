import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubeventsComponent } from './event-subevents.component';

describe('EventSubeventsComponent', () => {
  let component: EventSubeventsComponent;
  let fixture: ComponentFixture<EventSubeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSubeventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSubeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
