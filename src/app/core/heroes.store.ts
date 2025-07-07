import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { computed } from '@angular/core';
import { Hero } from './models/hero.model';
import { pipe, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { HeroService } from './services/hero.service';

type HeroesState = {
  heroes: Hero[];
  query: string;
  isLoading: boolean;
  selectedHero: Hero | null;
};

const initialState: HeroesState = {
  heroes: [],
  query: '',
  isLoading: false,
  selectedHero: null,
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
      return heroes.filter((hero) =>
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

    addHero: rxMethod<Omit<Hero, 'id'>>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        switchMap((hero) =>
          heroService.createHero(hero, store.heroes()).pipe(
            tapResponse({
              next: (newHero: Hero) => {
                patchState(store, (state) => ({
                  heroes: [...state.heroes, newHero],
                }));
                patchState(store, { isLoading: false });
              },
              error: () => {
                patchState(store, { isLoading: false });
              },
            })
          )
        )
      )
    ),

    deleteHero: rxMethod<number>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        switchMap((id) =>
          heroService.deleteHero(id, store.heroes()).pipe(
            tapResponse({
              next: (success: boolean) => {
                if (success) {
                  patchState(store, (state) => ({
                    heroes: state.heroes.filter((h) => h.id !== id),
                  }));
                }
                patchState(store, { isLoading: false });
              },
              error: () => {
                patchState(store, { isLoading: false });
              },
            })
          )
        )
      )
    ),

    updateHero: rxMethod<Hero>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        switchMap((updatedHero) =>
          heroService.updateHero(updatedHero, store.heroes()).pipe(
            tapResponse({
              next: (hero: Hero | null) => {
                if (hero) {
                  patchState(store, (state) => ({
                    heroes: state.heroes.map((h) =>
                      h.id === updatedHero.id ? updatedHero : h
                    ),
                  }));
                }
                patchState(store, { isLoading: false });
              },
              error: () => {
                patchState(store, { isLoading: false });
              },
            })
          )
        )
      )
    ),

    searchHeroesByName: rxMethod<string>(
      pipe(
        switchMap((searchTerm) =>
          heroService.searchHeroesByName(searchTerm, store.heroes()).pipe(
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

    getHeroById: rxMethod<number>(
      pipe(
        switchMap((id) =>
          heroService.getHeroById(id, store.heroes()).pipe(
            tapResponse({
              next: (hero: Hero | null) => {
                patchState(store, { selectedHero: hero });
              },
              error: () => {
                patchState(store, { selectedHero: null });
              },
            })
          )
        )
      )
    ),

    setQuery: (query: string) => {
      patchState(store, { query });
    },

    clearSelectedHero: () => {
      patchState(store, { selectedHero: null });
    },
  }))
);
