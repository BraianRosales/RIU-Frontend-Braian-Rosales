import { AfterViewInit, Component, OnInit, ViewChild, input, output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MATERIAL_IMPORTS, MATERIAL_PROVIDERS } from '../../material-ui.imports';
import { CommonModule } from '@angular/common';
import { TableAction } from './riu-table.interfaces';
@Component({
  selector: 'app-riu-table',
  imports: [...MATERIAL_IMPORTS, CommonModule],
  providers: [...MATERIAL_PROVIDERS],
  templateUrl: './riu-table.component.html',
  styleUrl: './riu-table.component.scss'
})
export class RiuTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  title = input<string>('Resultados de la tabla')
  data = input<any[]>([]);
  displayedColumns = input<string[]>([]);
  dataSource = input<MatTableDataSource<any>>();
  columnTitles = input<{ [key: string]: string }>({});
  actions = input<TableAction[]>([]);

  actionClicked = output<{ action: string; row: any }>();

  ngOnInit(){}

  ngAfterViewInit() {
    const currentDataSource = this.dataSource();
    if (currentDataSource && this.paginator) {
      currentDataSource.paginator = this.paginator;
    }
  }

  getColumnTitle(columnKey: string): string {
    return this.columnTitles()[columnKey] || columnKey;
  }

  isActionColumn(columnKey: string): boolean {
    return columnKey === 'actions';
  }

  getIconColor(color: string): string {
    return color || '';
  }

  onActionClick(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }
}
