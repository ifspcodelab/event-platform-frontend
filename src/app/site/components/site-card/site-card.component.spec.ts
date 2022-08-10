import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCardComponent } from './site-card.component';

describe('SiteCardComponent', () => {
  let component: SiteCardComponent;
  let fixture: ComponentFixture<SiteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
