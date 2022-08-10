import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerShowComponent } from './speaker-show.component';

describe('SpeakerShowComponent', () => {
  let component: SpeakerShowComponent;
  let fixture: ComponentFixture<SpeakerShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakerShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
