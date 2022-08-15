import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountShowComponent } from './account-show.component';

describe('AccountShowComponent', () => {
  let component: AccountShowComponent;
  let fixture: ComponentFixture<AccountShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
