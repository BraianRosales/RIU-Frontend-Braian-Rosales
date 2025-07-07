import { TestBed } from '@angular/core/testing';
import { HeroesStore } from './heroes.store';
import { HeroService } from './services/hero.service';
import { Hero } from './models/hero.model';
import { of, throwError } from 'rxjs';

describe('HeroesStore', () => {
  let store: InstanceType<typeof HeroesStore>;
  let heroService: jasmine.SpyObj<HeroService>;
  let mockHeroes: Hero[];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HeroService', [
      'getHeroes',
      'getHeroById',
      'searchHeroesByName',
      'createHero',
      'updateHero',
      'deleteHero',
    ]);

    TestBed.configureTestingModule({
      providers: [HeroesStore, { provide: HeroService, useValue: spy }],
    });

    store = TestBed.inject(HeroesStore);
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;

    mockHeroes = [
      {
        id: 1,
        name: 'Superman',
        power: 'Super Fuerza',
        universe: 'DC',
        level: 95,
      },
      {
        id: 2,
        name: 'Spider-Man',
        power: 'Sentido Arácnido',
        universe: 'Marvel',
        level: 85,
      },
    ];
  });

  it('should be created HeroesStore', () => {
    expect(store).toBeTruthy();
  });

  describe('initialState for the heroes', () => {
    it('this must have initial state', () => {
      expect(store.heroes()).toEqual([]);
      expect(store.query()).toBe('');
      expect(store.isLoading()).toBe(false);
      expect(store.selectedHero()).toBeNull();
    });
  });

  describe('loadHeroes rxMethod', () => {
    it('load heroes successfully', () => {
      heroService.getHeroes.and.returnValue(of(mockHeroes));

      store.loadHeroes();

      expect(heroService.getHeroes).toHaveBeenCalled();
      expect(store.heroes()).toEqual(mockHeroes);
    });

    it('handle error when loading heroes', () => {
      heroService.getHeroes.and.returnValue(
        throwError(() => new Error('Test error'))
      );

      store.loadHeroes();

      expect(heroService.getHeroes).toHaveBeenCalled();
    });
  });

  describe('addHero rxMethod', () => {
    it('add hero successfully', () => {
      const newHero = {
        name: 'Batman',
        power: 'Inteligencia',
        universe: 'DC' as const,
        level: 90,
      };
      const createdHero = { ...newHero, id: 3 };

      heroService.createHero.and.returnValue(of(createdHero));

      store.addHero(newHero);

      expect(heroService.createHero).toHaveBeenCalledWith(newHero, []);
    });

    it('must handle error when adding hero', () => {
      const newHero = {
        name: 'Batman',
        power: 'Inteligencia',
        universe: 'DC' as const,
        level: 90,
      };

      heroService.createHero.and.returnValue(
        throwError(() => new Error('Test error'))
      );

      store.addHero(newHero);

      expect(heroService.createHero).toHaveBeenCalledWith(newHero, []);
    });
  });

  describe('deleteHero rxMethod', () => {
    it('call deleteHero service method', () => {
      heroService.deleteHero.and.returnValue(of(true));

      store.deleteHero(1);

      expect(heroService.deleteHero).toHaveBeenCalledWith(1, []);
    });

    it('remove hero from state when deletion is successful', () => {
      heroService.getHeroes.and.returnValue(of(mockHeroes));
      store.loadHeroes();

      heroService.deleteHero.and.returnValue(of(true));
      store.deleteHero(1);

      expect(store.heroes().length).toBe(1);
      expect(store.heroes().find((h) => h.id === 1)).toBeUndefined();
      expect(store.heroes().find((h) => h.id === 2)).toBeTruthy();
    });

    it('should not remove hero from state when deletion fails', () => {
      heroService.getHeroes.and.returnValue(of(mockHeroes));
      store.loadHeroes();

      heroService.deleteHero.and.returnValue(of(false));
      store.deleteHero(1);

      expect(store.heroes().length).toBe(2);
      expect(store.heroes().find((h) => h.id === 1)).toBeTruthy();
    });

    it('must handle error when deleting hero', () => {
      heroService.deleteHero.and.returnValue(
        throwError(() => new Error('Test error'))
      );

      store.deleteHero(1);

      expect(heroService.deleteHero).toHaveBeenCalledWith(1, []);
    });
  });

  describe('updateHero rxMethod', () => {
    it('must call updateHero service method', () => {
      const updatedHero = {
        id: 1,
        name: 'Superman Updated',
        power: 'Super Fuerza',
        universe: 'DC' as const,
        level: 100,
      };

      heroService.updateHero.and.returnValue(of(updatedHero));

      store.updateHero(updatedHero);

      expect(heroService.updateHero).toHaveBeenCalledWith(updatedHero, []);
    });

    it('must update hero in state when update is successful', () => {
      heroService.getHeroes.and.returnValue(of(mockHeroes));
      store.loadHeroes();

      const updatedHero = {
        id: 1,
        name: 'Superman Updated',
        power: 'Super Fuerza',
        universe: 'DC' as const,
        level: 100,
      };

      heroService.updateHero.and.returnValue(of(updatedHero));
      store.updateHero(updatedHero);

      const heroInState = store.heroes().find((h) => h.id === 1);
      expect(heroInState).toBeTruthy();
      expect(heroInState?.name).toBe('Superman Updated');
      expect(heroInState?.level).toBe(100);

      const otherHero = store.heroes().find((h) => h.id === 2);
      expect(otherHero?.name).toBe('Spider-Man');
    });

    it('should not update hero in state when service returns null', () => {
      heroService.getHeroes.and.returnValue(of(mockHeroes));
      store.loadHeroes();

      const updatedHero = {
        id: 999, // Hero that does not exist in the array
        name: 'Non Existent',
        power: 'Test',
        universe: 'DC' as const,
        level: 50,
      };

      heroService.updateHero.and.returnValue(of(null));
      store.updateHero(updatedHero);

      expect(store.heroes().length).toBe(2);
      const originalHero = store.heroes().find((h) => h.id === 1);
      expect(originalHero?.name).toBe('Superman'); // Original name, not updated
    });

    it('must handle error when updating hero', () => {
      const updatedHero = {
        id: 1,
        name: 'Superman Updated',
        power: 'Super Fuerza',
        universe: 'DC' as const,
        level: 100,
      };

      heroService.updateHero.and.returnValue(
        throwError(() => new Error('Test error'))
      );

      store.updateHero(updatedHero);

      expect(heroService.updateHero).toHaveBeenCalledWith(updatedHero, []);
    });
  });

  describe('searchHeroesByName rxMethod', () => {
    it('search heroes by name', () => {
      const searchResults = [mockHeroes[0]];
      heroService.searchHeroesByName.and.returnValue(of(searchResults));

      store.searchHeroesByName('Super');

      expect(heroService.searchHeroesByName).toHaveBeenCalledWith('Super', []);
      expect(store.heroes()).toEqual(searchResults);
    });

    it('handle error when searching heroes by name', () => {
      heroService.searchHeroesByName.and.returnValue(
        throwError(() => new Error('Test error'))
      );

      store.searchHeroesByName('Super');

      expect(heroService.searchHeroesByName).toHaveBeenCalledWith('Super', []);
      expect(store.heroes()).toEqual([]);
    });
  });

  describe('getHeroById rxMethod', () => {
    it('get hero by id successfully', () => {
      heroService.getHeroById.and.returnValue(of(mockHeroes[0]));

      store.getHeroById(1);

      expect(heroService.getHeroById).toHaveBeenCalledWith(1, []);
      expect(store.selectedHero()).toEqual(mockHeroes[0]);
    });

    it('handle hero not found', () => {
      heroService.getHeroById.and.returnValue(of(null));

      store.getHeroById(999);

      expect(store.selectedHero()).toBeNull();
    });

    it('handle error when getting hero by id', () => {
      heroService.getHeroById.and.returnValue(
        throwError(() => new Error('Test error'))
      );

      store.getHeroById(1);

      expect(heroService.getHeroById).toHaveBeenCalledWith(1, []);
      expect(store.selectedHero()).toBeNull();
    });
  });

  describe('setQuery method', () => {
    it('must set query', () => {
      store.setQuery('test query');

      expect(store.query()).toBe('test query');
    });
  });

  describe('clearSelectedHero method', () => {
    it('clear selected hero', () => {
      store.clearSelectedHero();

      expect(store.selectedHero()).toBeNull();
    });
  });

  describe('filteredHeroes computed', () => {
    it('this return empty array when no heroes', () => {
      store.setQuery('');

      expect(store.filteredHeroes()).toEqual([]);
    });

    it('return all heroes when query is empty', () => {
      heroService.getHeroes.and.returnValue(of(mockHeroes));
      store.loadHeroes();

      store.setQuery('');

      expect(store.filteredHeroes()).toEqual(mockHeroes);
    });

    it('filter heroes by name (case insensitive)', () => {
      heroService.getHeroes.and.returnValue(of(mockHeroes));
      store.loadHeroes();

      store.setQuery('super');

      const filtered = store.filteredHeroes();
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Superman');
    });

    it('filter heroes with whitespace in query', () => {
      heroService.getHeroes.and.returnValue(of(mockHeroes));
      store.loadHeroes();

      store.setQuery('  spider  ');

      const filtered = store.filteredHeroes();
      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe('Spider-Man');
    });
  });
});
