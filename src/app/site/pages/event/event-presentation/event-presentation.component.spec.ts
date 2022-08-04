import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPresentationComponent } from './event-presentation.component';

describe('EventPresentationComponent', () => {
  let component: EventPresentationComponent;
  let fixture: ComponentFixture<EventPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
