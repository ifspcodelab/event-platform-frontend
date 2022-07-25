import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationShowComponent } from './location-show.component';

describe('LocationShowComponent', () => {
  let component: LocationShowComponent;
  let fixture: ComponentFixture<LocationShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
