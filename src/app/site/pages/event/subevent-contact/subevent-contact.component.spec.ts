import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventContactComponent } from './subevent-contact.component';

describe('SubeventContactComponent', () => {
  let component: SubeventContactComponent;
  let fixture: ComponentFixture<SubeventContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubeventContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubeventContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
