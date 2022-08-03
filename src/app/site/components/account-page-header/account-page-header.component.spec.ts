import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageHeaderComponent } from './account-page-header.component';

describe('AccountPageHeaderComponent', () => {
  let component: AccountPageHeaderComponent;
  let fixture: ComponentFixture<AccountPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
