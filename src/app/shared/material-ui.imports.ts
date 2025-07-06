import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { getCustomPaginatorIntl } from './custom-paginator-intl';


export const MATERIAL_IMPORTS = [
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule
];

export const MATERIAL_PROVIDERS = [
  { provide: MatPaginatorIntl, useFactory: getCustomPaginatorIntl }
];
