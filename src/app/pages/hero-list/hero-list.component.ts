import { Component, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS, MATERIAL_PROVIDERS } from '../../shared/material-ui.imports';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-list',
  imports: [...MATERIAL_IMPORTS, FormsModule],
  providers: [...MATERIAL_PROVIDERS],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  heroes = [
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

  displayedColumns: string[] = ['name', 'power', 'universe', 'level', 'actions'];
  dataSource = new MatTableDataSource(this.heroes);
  searchTerm: string = '';

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // TODO: Method to filter the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addHero() {
    console.log('Añadir héroe');
    // TODO: logic for add a hero
  }

  editHero(hero: any) {
    console.log('Editar héroe:', hero);
    // TODO: logic for edit a hero
  }

  deleteHero(hero: any) {
    console.log('Eliminar héroe:', hero);
    // TODO: logic for delete a hero
  }

  seeDetail(hero: any) {
    console.log('Ver detalle:', hero)
    // TODO: logic for see detail
  }
}
