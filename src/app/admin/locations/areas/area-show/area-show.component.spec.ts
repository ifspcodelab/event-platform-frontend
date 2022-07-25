import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaShowComponent } from './area-show.component';

describe('AreaShowComponent', () => {
  let component: AreaShowComponent;
  let fixture: ComponentFixture<AreaShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
