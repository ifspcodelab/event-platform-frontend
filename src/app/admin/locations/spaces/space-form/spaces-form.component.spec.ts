import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesFormComponent } from './spaces-form.component';

describe('SpacesFormComponent', () => {
  let component: SpacesFormComponent;
  let fixture: ComponentFixture<SpacesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
