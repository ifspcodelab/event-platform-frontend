import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAndSubeventListComponent } from './event-and-subevent-list.component';

describe('EventAndSubeventListComponent', () => {
  let component: EventAndSubeventListComponent;
  let fixture: ComponentFixture<EventAndSubeventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAndSubeventListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventAndSubeventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
