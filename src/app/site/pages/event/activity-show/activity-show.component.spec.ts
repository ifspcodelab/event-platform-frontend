import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityShowComponent } from './activity-show.component';

describe('ActivityShowComponent', () => {
  let component: ActivityShowComponent;
  let fixture: ComponentFixture<ActivityShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
