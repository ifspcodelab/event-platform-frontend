import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerSubeventFormComponent } from './organizer-subevent-form.component';

describe('OrganizerSubeventFormComponent', () => {
  let component: OrganizerSubeventFormComponent;
  let fixture: ComponentFixture<OrganizerSubeventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerSubeventFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerSubeventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
