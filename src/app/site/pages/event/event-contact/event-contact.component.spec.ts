import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventContactComponent } from './event-contact.component';

describe('EventContactComponent', () => {
  let component: EventContactComponent;
  let fixture: ComponentFixture<EventContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
