import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiuAlertDialogComponent } from './riu-alert-dialog.component';

describe('RiuAlertDialogComponent', () => {
  let component: RiuAlertDialogComponent;
  let fixture: ComponentFixture<RiuAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiuAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiuAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
