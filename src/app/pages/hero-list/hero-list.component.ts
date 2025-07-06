import { Component, inject, OnInit, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RiuTableComponent } from '../../shared/components/riu-table/riu-table.component';
import { RiuSearcherComponent } from '../../shared/components/riu-searcher/riu-searcher.component';
import { MATERIAL_IMPORTS } from '../../shared/material-ui.imports';
import { TableAction } from '../../shared/components/riu-table/riu-table.interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { HeroFormDialogComponent } from './components/hero-form-dialog/hero-form-dialog.component';
import { Hero } from '../../core/models/hero.model';
import { HeroesStore } from '../../core/heroes.store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogService } from '../../shared/services/alert-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-list',
  imports: [...MATERIAL_IMPORTS, RiuTableComponent, RiuSearcherComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent {
  dialog = inject(Dialog);
  matDialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  alertDialog = inject(AlertDialogService);
  heroesStore = inject(HeroesStore);
  router = inject(Router);

  dataSource = new MatTableDataSource<Hero>([]);
  displayedColumns = ['name', 'power', 'universe', 'level', 'actions'];
  columnTitles = {
    name: 'Nombre',
    power: 'Poder Principal',
    universe: 'Universo',
    level: 'Nivel',
    actions: 'Acciones',
  };

  tableActions: TableAction[] = [
    {
      name: 'Ver detalle',
      icon: 'visibility',
      color: 'accent',
      action: 'detail',
    },
    {
      name: 'Editar',
      icon: 'edit',
      color: 'primary',
      action: 'edit',
    },
    {
      name: 'Eliminar',
      icon: 'delete',
      color: 'warn',
      action: 'delete',
    },
  ];

  constructor() {
    effect(() => {
      this.dataSource.data = this.heroesStore.filteredHeroes();
    });
  }

  searchHero(event: string) {
    this.heroesStore.setQuery(event);
  }

  handleTableAction(event: { action: string; row: any }) {
    switch (event.action) {
      case 'detail':
        this.showHeroDetail(event.row);
        break;
      case 'edit':
        this.editHero(event.row);
        break;
      case 'delete':
        this.deleteHero(event.row);
        break;
      default:
        console.warn('Acción no reconocida:', event.action);
    }
  }

  addHero() {
    const dialogRef = this.dialog.open<Hero>(HeroFormDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.closed.subscribe((result: Hero | undefined) => {
      if (result) {
        this.heroesStore.addHero(result);
        this.snackBar.open(`${result.name} fue agregado`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  editHero(hero: Hero) {
    const dialogRef = this.dialog.open<Hero>(HeroFormDialogComponent, {
      width: '500px',
      data: { hero: hero },
    });

    dialogRef.closed.subscribe((result: Hero | undefined) => {
      if (result) {
        this.heroesStore.updateHero(result);
        this.snackBar.open(`${result.name} fue actualizado`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  deleteHero(hero: Hero) {
    this.alertDialog.confirmDelete(hero.name).subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.heroesStore.deleteHero(hero);
        this.snackBar.open(`${hero.name} fue eliminado`, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  showHeroDetail(hero: Hero) {
    this.router.navigate(['/heroes', hero.id]);
  }
}
