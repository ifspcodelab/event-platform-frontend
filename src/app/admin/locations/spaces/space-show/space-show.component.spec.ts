import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceShowComponent } from './space-show.component';

describe('SpaceShowComponent', () => {
  let component: SpaceShowComponent;
  let fixture: ComponentFixture<SpaceShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
