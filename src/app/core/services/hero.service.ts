import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Observable, of, delay } from 'rxjs';

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
  private heroesData: Hero[] = [...heroes];

  getHeroes(): Observable<Hero[]> {
    return of(this.heroesData);
  }

  getHeroById(id: number, heroes: Hero[]): Observable<Hero | null> {
    const hero = heroes.find((h) => h.id === id);
    return of(hero || null);
  }

  searchHeroesByName(searchTerm: string, heroes: Hero[]): Observable<Hero[]> {
    const filteredHeroes = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredHeroes);
  }

  createHero(hero: Omit<Hero, 'id'>, heroes: Hero[]): Observable<Hero> {
    const newId = Math.max(...heroes.map((h) => h.id), 0) + 1;
    const newHero: Hero = { ...hero, id: newId };
    return of(newHero).pipe(delay(1000));
  }

  updateHero(updatedHero: Hero, heroes: Hero[]): Observable<Hero | null> {
    const index = heroes.findIndex((h) => h.id === updatedHero.id);
    if (index !== -1) {
      return of(updatedHero).pipe(delay(1000));
    }
    return of(null);
  }

  deleteHero(id: number, heroes: Hero[]): Observable<boolean> {
    const index = heroes.findIndex((h) => h.id === id);
    if (index !== -1) {
      return of(true).pipe(delay(1000));
    }
    return of(false);
  }
}
