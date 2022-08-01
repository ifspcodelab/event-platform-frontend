import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventsFormComponent } from './subevents-form.component';

describe('SubeventsFormComponent', () => {
  let component: SubeventsFormComponent;
  let fixture: ComponentFixture<SubeventsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubeventsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubeventsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
