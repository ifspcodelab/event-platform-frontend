import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerFormComponent } from './speaker-form.component';

describe('SpeakerFormComponent', () => {
  let component: SpeakerFormComponent;
  let fixture: ComponentFixture<SpeakerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
