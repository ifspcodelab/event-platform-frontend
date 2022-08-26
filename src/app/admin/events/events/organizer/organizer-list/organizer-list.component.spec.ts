import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerListComponent } from './organizer-list.component';

describe('OrganizerListComponent', () => {
  let component: OrganizerListComponent;
  let fixture: ComponentFixture<OrganizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
