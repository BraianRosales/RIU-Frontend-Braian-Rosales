import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../models/hero.model';

describe('HeroService', () => {
  let service: HeroService;
  let mockHeroes: Hero[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
    
    mockHeroes = [
      { id: 1, name: 'Superman', power: 'Super Fuerza', universe: 'DC', level: 95 },
      { id: 2, name: 'Spider-Man', power: 'Sentido Arácnido', universe: 'Marvel', level: 85 }
    ];
  });

  it('should be created HeroService', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroes method', () => {
    it('return all heroes', (done) => {
      service.getHeroes().subscribe(heroes => {
        expect(heroes.length).toBeGreaterThan(0);
        expect(heroes[0].id).toBeDefined();
        expect(heroes[0].name).toBeDefined();
        done();
      });
    });
  });

  describe('getHeroById method', () => {
    it('return hero by id', (done) => {
      service.getHeroById(1, mockHeroes).subscribe(hero => {
        expect(hero).toBeTruthy();
        expect(hero?.id).toBe(1);
        expect(hero?.name).toBe('Superman');
        done();
      });
    });

    it('returns null for a hero that does not exist', (done) => {
      service.getHeroById(999, mockHeroes).subscribe(hero => {
        expect(hero).toBeNull();
        done();
      });
    });
  });

  describe('searchHeroesByName method', () => {
    it('return heroes matching search term', (done) => {
      service.searchHeroesByName('Super', mockHeroes).subscribe(heroes => {
        expect(heroes.length).toBe(1);
        expect(heroes[0].name).toBe('Superman');
        done();
      });
    });

    it('return empty array for no matches', (done) => {
      service.searchHeroesByName('NonExistent', mockHeroes).subscribe(heroes => {
        expect(heroes.length).toBe(0);
        done();
      });
    });

    it('should be case insensitive', (done) => {
      service.searchHeroesByName('spider', mockHeroes).subscribe(heroes => {
        expect(heroes.length).toBe(1);
        expect(heroes[0].name).toBe('Spider-Man');
        done();
      });
    });
  });

  describe('createHero method', () => {
    it('create a new hero with generated id', (done) => {
      const newHero = { name: 'Batman', power: 'Inteligencia', universe: 'DC' as const, level: 90 };
      
      service.createHero(newHero, mockHeroes).subscribe(createdHero => {
        expect(createdHero.id).toBe(3);
        expect(createdHero.name).toBe('Batman');
        expect(createdHero.power).toBe('Inteligencia');
        done();
      });
    });

    it('handle empty heroes array', (done) => {
      const newHero = { name: 'Batman', power: 'Inteligencia', universe: 'DC' as const, level: 90 };
      
      service.createHero(newHero, []).subscribe(createdHero => {
        expect(createdHero.id).toBe(1);
        done();
      });
    });
  });

  describe('updateHero method', () => {
    it('must update existing hero', (done) => {
      const updatedHero = { id: 1, name: 'Superman Updated', power: 'Super Fuerza', universe: 'DC' as const, level: 100 };
      
      service.updateHero(updatedHero, mockHeroes).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result?.name).toBe('Superman Updated');
        expect(result?.level).toBe(100);
        done();
      });
    });

    it('returns null for a hero that does not exist', (done) => {
      const updatedHero = { id: 999, name: 'Non Existent', power: 'Test', universe: 'DC' as const, level: 50 };
      
      service.updateHero(updatedHero, mockHeroes).subscribe(result => {
        expect(result).toBeNull();
        done();
      });
    });
  });

  describe('deleteHero method', () => {
    it('return true for existing hero', (done) => {
      service.deleteHero(1, mockHeroes).subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });

    it('return false for non-existent hero', (done) => {
      service.deleteHero(999, mockHeroes).subscribe(result => {
        expect(result).toBe(false);
        done();
      });
    });
  });
});
