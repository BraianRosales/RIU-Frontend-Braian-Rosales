import { patchState, signalStore, withMethods, withState, withComputed } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { computed } from '@angular/core';

import { Hero } from './models/hero.model';
import { pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { HeroService } from './services/hero.service';

type HeroesState = {
  heroes: Hero[];
  query: string;
  isLoading: boolean;
};

const initialState: HeroesState = {
  heroes: [],
  query: '',
  isLoading: false,
};

export const HeroesStore = signalStore(
  withState(initialState),
  
  withComputed((state) => ({
    filteredHeroes: computed(() => {
      const heroes = state.heroes();
      const query = state.query();
      
      if (!query || query.trim() === '') {
        return heroes;
      }
      
      const searchTerm = query.toLowerCase().trim();
      return heroes.filter(hero => 
        hero.name.toLowerCase().includes(searchTerm)
      );
    }),
  })),

  withMethods((store, heroService = inject(HeroService)) => ({
    loadHeroes: rxMethod<void>(
      pipe(
        switchMap(() =>
          heroService.getHeroes().pipe(
            tapResponse({
              next: (heroes: Hero[]) => {
                patchState(store, { heroes });
              },
              error: () => {},
            })
          )
        )
      )
    ),

    addHero: (hero: Hero) => {
      patchState(store, (state) => {
        const newId = Math.max(...state.heroes.map(h => h.id), 0) + 1;
        return {
          heroes: [...state.heroes, { ...hero, id: newId }],
        };
      });
    },

    deleteHero: (hero: Hero) => {
      patchState(store, (state) => ({
        heroes: state.heroes.filter((h) => h.id !== hero.id),
      }));
    },

    updateHero: (updatedHero: Hero) => {
      patchState(store, (state) => ({
        heroes: state.heroes.map((hero) => 
          hero.id === updatedHero.id ? updatedHero : hero
        ),
      }));
    },

    setQuery: (query: string) => {
      patchState(store, { query });
    },
  }))
);
