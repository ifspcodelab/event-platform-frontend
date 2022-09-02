import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizersComponent } from './event-organizers.component';

describe('EventOrganizersComponent', () => {
  let component: EventOrganizersComponent;
  let fixture: ComponentFixture<EventOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOrganizersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
