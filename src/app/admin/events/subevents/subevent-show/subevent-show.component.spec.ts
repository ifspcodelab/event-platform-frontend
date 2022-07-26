import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventShowComponent } from './subevent-show.component';

describe('SubeventShowComponent', () => {
  let component: SubeventShowComponent;
  let fixture: ComponentFixture<SubeventShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubeventShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubeventShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
