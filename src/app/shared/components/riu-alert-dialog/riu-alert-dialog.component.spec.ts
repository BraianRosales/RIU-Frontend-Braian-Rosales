import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiuAlertDialogComponent } from './riu-alert-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('RiuAlertDialogComponent', () => {
  let component: RiuAlertDialogComponent;
  let fixture: ComponentFixture<RiuAlertDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<RiuAlertDialogComponent>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [RiuAlertDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test', message: 'Test message' } },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiuAlertDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<RiuAlertDialogComponent>>;
    fixture.detectChanges();
  });

  it('should create RiuAlertDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('display title and message from dialog data', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test');
    expect(compiled.textContent).toContain('Test message');
  });

  describe('onConfirm method', () => {
    it('close dialog with true when onConfirm is called', () => {
      component.onConfirm();

      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });

  describe('onCancel method', () => {
    it('close dialog with false when onCancel is called', () => {
      component.onCancel();

      expect(dialogRef.close).toHaveBeenCalledWith(false);
    });
  });
});
