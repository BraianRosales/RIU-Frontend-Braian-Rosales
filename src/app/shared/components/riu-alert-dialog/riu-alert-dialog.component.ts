import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogData } from './riu-alert-dialog.interfaces';
import { MATERIAL_IMPORTS } from '../../material-ui.imports';

@Component({
  selector: 'app-riu-alert-dialog',
  imports: [CommonModule, ...MATERIAL_IMPORTS],
  templateUrl: './riu-alert-dialog.component.html',
  styleUrl: './riu-alert-dialog.component.scss',
})
export class RiuAlertDialogComponent {
  data: AlertDialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<RiuAlertDialogComponent>);

  get confirmText(): string {
    return this.data.confirmText || 'Confirmar';
  }

  get cancelText(): string {
    return this.data.cancelText || 'Cancelar';
  }

  get type(): string {
    return this.data.type || 'warning';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
