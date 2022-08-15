import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySpeakersComponent } from './activity-speakers.component';

describe('ActivitySpeakersComponent', () => {
  let component: ActivitySpeakersComponent;
  let fixture: ComponentFixture<ActivitySpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySpeakersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
