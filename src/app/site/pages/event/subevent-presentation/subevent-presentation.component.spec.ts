import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventPresentationComponent } from './subevent-presentation.component';

describe('SubeventPresentationComponent', () => {
  let component: SubeventPresentationComponent;
  let fixture: ComponentFixture<SubeventPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubeventPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubeventPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
