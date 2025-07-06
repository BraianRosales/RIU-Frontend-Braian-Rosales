import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RiuTableComponent } from '../../shared/components/riu-table/riu-table.component';
import { RiuSearcherComponent } from '../../shared/components/riu-searcher/riu-searcher.component';
import { MATERIAL_IMPORTS } from '../../shared/material-ui.imports';
import { TableAction } from '../../shared/components/riu-table/riu-table.interfaces';
import { Dialog } from '@angular/cdk/dialog';
import { HeroFormDialogComponent } from './components/hero-form-dialog/hero-form-dialog.component';
import { Hero } from '../../core/models/hero.model';

@Component({
  selector: 'app-hero-list',
  imports: [...MATERIAL_IMPORTS, RiuTableComponent, RiuSearcherComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  private dialog = inject(Dialog);

  heroes: Hero[] = [
    { id: 1, name: 'Superman', power: 'Super Fuerza', universe: 'DC', level: 95 },
    { id: 2, name: 'Spider-Man', power: 'Sentido Arácnido', universe: 'Marvel', level: 85 },
    { id: 3, name: 'Batman', power: 'Inteligencia', universe: 'DC', level: 90 },
    { id: 4, name: 'Iron Man', power: 'Tecnología', universe: 'Marvel', level: 88 },
    { id: 5, name: 'Wonder Woman', power: 'Lazo de la Verdad', universe: 'DC', level: 92 },
    { id: 6, name: 'Captain America', power: 'Escudo', universe: 'Marvel', level: 87 },
    { id: 7, name: 'Flash', power: 'Super Velocidad', universe: 'DC', level: 89 },
    { id: 8, name: 'Thor', power: 'Martillo Mjolnir', universe: 'Marvel', level: 94 },
    { id: 9, name: 'Aquaman', power: 'Control del agua', universe: 'DC', level: 86 },
    { id: 10, name: 'Black Panther', power: 'Agilidad y fuerza', universe: 'Marvel', level: 83 },
  ];

  dataSource = new MatTableDataSource<Hero>(this.heroes);
  displayedColumns = ['name', 'power', 'universe', 'level', 'actions'];
  columnTitles = {
    'name': 'Nombre',
    'power': 'Poder Principal',
    'universe': 'Universo',
    'level': 'Nivel',
    'actions': 'Acciones'
  };

  tableActions: TableAction[] = [
    {
      name: 'Ver detalle',
      icon: 'visibility',
      color: 'accent',
      action: 'detail'
    },
    {
      name: 'Editar',
      icon: 'edit',
      color: 'primary',
      action: 'edit'
    },
    {
      name: 'Eliminar',
      icon: 'delete',
      color: 'warn',
      action: 'delete'
    }
  ];

  searchHero(event: string) {
    const filterValue = event;
    console.log("Buscar por:", filterValue.trim().toLowerCase())
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
        console.log('Acción no reconocida:', event.action);
    }
  }

  addHero() {
    console.log('Añadir héroe');
    
    const dialogRef = this.dialog.open<Hero>(HeroFormDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.closed.subscribe((result: Hero | undefined) => {
      if (result) {
        console.log('Nuevo héroe creado:', result);
        this.heroes.push(result);
        this.dataSource.data = [...this.heroes];
      }
    });
  }

  editHero(hero: Hero) {
    console.log('Editar héroe:', hero);
    const dialogRef = this.dialog.open<Hero>(HeroFormDialogComponent, {
      width: '500px',
      data: { hero: hero }
    });

    dialogRef.closed.subscribe((result: Hero | undefined) => {
      if (result) {
        const index = this.heroes.findIndex(h => h.id === hero.id);
        if (index !== -1) {
          this.heroes[index] = result;
          this.dataSource.data = [...this.heroes];
        }
      }
    });
  }

  deleteHero(hero: Hero) {
    console.log('Eliminar héroe:', hero);
    const index = this.heroes.findIndex(h => h.id === hero.id);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      this.dataSource.data = [...this.heroes];
    }
  }

  showHeroDetail(hero: Hero) {
    console.log('Ver detalle:', hero)
  }
}
