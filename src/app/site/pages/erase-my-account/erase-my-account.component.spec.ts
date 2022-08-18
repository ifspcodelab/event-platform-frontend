import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraseMyAccountComponent } from './erase-my-account.component';

describe('EraseMyAccountComponent', () => {
  let component: EraseMyAccountComponent;
  let fixture: ComponentFixture<EraseMyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EraseMyAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EraseMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
