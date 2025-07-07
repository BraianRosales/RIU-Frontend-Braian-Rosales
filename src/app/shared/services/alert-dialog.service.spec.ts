import { TestBed } from '@angular/core/testing';
import { AlertDialogService } from './alert-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RiuAlertDialogComponent } from '../components/riu-alert-dialog/riu-alert-dialog.component';

describe('AlertDialogService', () => {
  let service: AlertDialogService;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        AlertDialogService,
        { provide: MatDialog, useValue: mockDialog },
      ],
    });

    service = TestBed.inject(AlertDialogService);
  });

  it('should be created AlertDialogService', () => {
    expect(service).toBeTruthy();
  });

  describe('confirm method', () => {
    it('open dialog with correct configuration', () => {
      const mockDialogRef = {
        afterClosed: () => of(true),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      const dialogData = {
        title: 'Test Title',
        message: 'Test Message',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        type: 'warning' as const,
      };

      const result = service.confirm(dialogData);

      expect(mockDialog.open).toHaveBeenCalledWith(RiuAlertDialogComponent, {
        width: '500px',
        data: dialogData,
        disableClose: true,
      });
      expect(result).toBeDefined();
    });

    it('return observable from dialog afterClosed', () => {
      const expectedResult = true;
      const mockDialogRef = {
        afterClosed: () => of(expectedResult),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      const dialogData = {
        title: 'Test Title',
        message: 'Test Message',
        confirmText: 'Confirm',
        type: 'info' as const,
      };

      service.confirm(dialogData).subscribe((result) => {
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe('confirmDelete method', () => {
    it('call confirm with correct delete dialog data', () => {
      const heroName = 'Superman';
      const mockDialogRef = {
        afterClosed: () => of(true),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      service.confirmDelete(heroName);

      expect(mockDialog.open).toHaveBeenCalledWith(RiuAlertDialogComponent, {
        width: '500px',
        data: {
          title: 'Confirmar eliminación',
          message: `¿Estás seguro de eliminar a ${heroName}?`,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          type: 'warning',
        },
        disableClose: true,
      });
    });

    it('return observable from confirmDelete', () => {
      const heroName = 'Batman';
      const expectedResult = false;
      const mockDialogRef = {
        afterClosed: () => of(expectedResult),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      service.confirmDelete(heroName).subscribe((result) => {
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe('showInfo method', () => {
    it('call confirm with correct info dialog data', () => {
      const title = 'Information';
      const message = 'This is an info message';
      const mockDialogRef = {
        afterClosed: () => of(true),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      service.showInfo(title, message);

      expect(mockDialog.open).toHaveBeenCalledWith(RiuAlertDialogComponent, {
        width: '500px',
        data: {
          title,
          message,
          confirmText: 'Aceptar',
          type: 'info',
        },
        disableClose: true,
      });
    });

    it('return observable from showInfo', () => {
      const title = 'Info Title';
      const message = 'Info Message';
      const expectedResult = true;
      const mockDialogRef = {
        afterClosed: () => of(expectedResult),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      service.showInfo(title, message).subscribe((result) => {
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe('showSuccess method', () => {
    it('call confirm with correct success dialog data', () => {
      const title = 'Success';
      const message = 'Operation completed successfully';
      const mockDialogRef = {
        afterClosed: () => of(true),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      service.showSuccess(title, message);

      expect(mockDialog.open).toHaveBeenCalledWith(RiuAlertDialogComponent, {
        width: '500px',
        data: {
          title,
          message,
          confirmText: 'Aceptar',
          type: 'success',
        },
        disableClose: true,
      });
    });

    it('return observable from showSuccess', () => {
      const title = 'Success Title';
      const message = 'Success Message';
      const expectedResult = true;
      const mockDialogRef = {
        afterClosed: () => of(expectedResult),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      service.showSuccess(title, message).subscribe((result) => {
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe('showError method', () => {
    it('call confirm with correct error dialog data', () => {
      const title = 'Error';
      const message = 'An error occurred';
      const mockDialogRef = {
        afterClosed: () => of(true),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      service.showError(title, message);

      expect(mockDialog.open).toHaveBeenCalledWith(RiuAlertDialogComponent, {
        width: '500px',
        data: {
          title,
          message,
          confirmText: 'Aceptar',
          type: 'error',
        },
        disableClose: true,
      });
    });

    it('return observable from showError', () => {
      const title = 'Error Title';
      const message = 'Error Message';
      const expectedResult = true;
      const mockDialogRef = {
        afterClosed: () => of(expectedResult),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      service.showError(title, message).subscribe((result) => {
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe('edge cases that can fail', () => {
    it('handle undefined result from dialog', () => {
      const mockDialogRef = {
        afterClosed: () => of(undefined),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      const dialogData = {
        title: 'Test',
        message: 'Test',
        confirmText: 'OK',
        type: 'info' as const,
      };

      service.confirm(dialogData).subscribe((result) => {
        expect(result).toBeUndefined();
      });
    });

    it('handle false result from dialog', () => {
      const mockDialogRef = {
        afterClosed: () => of(false),
      };
      mockDialog.open.and.returnValue(mockDialogRef as any);

      const dialogData = {
        title: 'Test',
        message: 'Test',
        confirmText: 'OK',
        type: 'info' as const,
      };

      service.confirm(dialogData).subscribe((result) => {
        expect(result).toBeFalse();
      });
    });
  });
});
