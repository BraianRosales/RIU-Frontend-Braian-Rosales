import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Observable, of } from 'rxjs';

const heroes: Hero[] = [
  { id: 1, name: 'Superman', power: 'Super Fuerza', universe: 'DC', level: 95 },
  {
    id: 2,
    name: 'Spider-Man',
    power: 'Sentido Arácnido',
    universe: 'Marvel',
    level: 85,
  },
  { id: 3, name: 'Batman', power: 'Inteligencia', universe: 'DC', level: 90 },
  {
    id: 4,
    name: 'Iron Man',
    power: 'Tecnología',
    universe: 'Marvel',
    level: 88,
  },
  {
    id: 5,
    name: 'Wonder Woman',
    power: 'Lazo de la Verdad',
    universe: 'DC',
    level: 92,
  },
  {
    id: 6,
    name: 'Captain America',
    power: 'Escudo',
    universe: 'Marvel',
    level: 87,
  },
  { id: 7, name: 'Flash', power: 'Super Velocidad', universe: 'DC', level: 89 },
  {
    id: 8,
    name: 'Thor',
    power: 'Martillo Mjolnir',
    universe: 'Marvel',
    level: 94,
  },
  {
    id: 9,
    name: 'Aquaman',
    power: 'Control del agua',
    universe: 'DC',
    level: 86,
  },
  {
    id: 10,
    name: 'Black Panther',
    power: 'Agilidad y fuerza',
    universe: 'Marvel',
    level: 83,
  },
];

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    return of(heroes);
  }
}
