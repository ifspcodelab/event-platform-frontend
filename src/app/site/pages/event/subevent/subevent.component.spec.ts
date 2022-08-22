import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventComponent } from './subevent.component';

describe('SubeventComponent', () => {
  let component: SubeventComponent;
  let fixture: ComponentFixture<SubeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubeventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
