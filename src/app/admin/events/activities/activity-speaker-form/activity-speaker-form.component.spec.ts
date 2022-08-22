import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySpeakerFormComponent } from './activity-speaker-form.component';

describe('ActivitySpeakerFormComponent', () => {
  let component: ActivitySpeakerFormComponent;
  let fixture: ComponentFixture<ActivitySpeakerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySpeakerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySpeakerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
