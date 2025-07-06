import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RiuAlertDialogComponent } from '../components/riu-alert-dialog/riu-alert-dialog.component';
import { AlertDialogData } from '../components/riu-alert-dialog/riu-alert-dialog.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {
  private dialog = inject(MatDialog);

  confirm(data: AlertDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(RiuAlertDialogComponent, {
      width: '500px',
      data,
      disableClose: true
    });

    return dialogRef.afterClosed();
  }

  confirmDelete(heroName: string): Observable<boolean> {
    return this.confirm({
      title: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar a ${heroName}?`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      type: 'warning'
    });
  }

  showInfo(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title,
      message,
      confirmText: 'Aceptar',
      type: 'info'
    });
  }

  showSuccess(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title,
      message,
      confirmText: 'Aceptar',
      type: 'success'
    });
  }

  showError(title: string, message: string): Observable<boolean> {
    return this.confirm({
      title,
      message,
      confirmText: 'Aceptar',
      type: 'error'
    });
  }
} 