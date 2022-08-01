import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDialogComponent } from './cancel-dialog.component';

describe('CancelDialogComponent', () => {
  let component: CancelDialogComponent;
  let fixture: ComponentFixture<CancelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
