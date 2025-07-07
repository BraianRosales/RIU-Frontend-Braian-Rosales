import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesStore } from '../../core/heroes.store';
import { Hero } from '../../core/models/hero.model';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroesStore: jasmine.SpyObj<InstanceType<typeof HeroesStore>>;
  let router: jasmine.SpyObj<Router>;

  const mockHero: Hero = {
    id: 1,
    name: 'Hero1',
    power: 'Super Power',
    universe: 'DC',
    level: 85,
  };

  beforeEach(async () => {
    const heroesStoreSpy = jasmine.createSpyObj(
      'HeroesStore',
      ['clearSelectedHero', 'getHeroById'],
      {
        selectedHero: () => null,
        heroes: () => [],
      }
    );
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent],
      providers: [
        { provide: HeroesStore, useValue: heroesStoreSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: { subscribe: () => {} },
            snapshot: { params: { id: '1' } },
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroesStore = TestBed.inject(HeroesStore) as jasmine.SpyObj<
      InstanceType<typeof HeroesStore>
    >;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create HeroDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  it('this should call clearSelectedHero and navigate when goBack is called', () => {
    component.goBack();
    expect(heroesStore.clearSelectedHero).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  describe('notFound computed property', () => {
    it('return true when heroId exists but no selectedHero and heroes array is not empty', async () => {
      const testHeroesStore = jasmine.createSpyObj(
        'HeroesStore',
        ['clearSelectedHero', 'getHeroById'],
        {
          selectedHero: () => null,
          heroes: () => [mockHero],
        }
      );

      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [HeroDetailComponent],
        providers: [
          { provide: HeroesStore, useValue: testHeroesStore },
          {
            provide: ActivatedRoute,
            useValue: {
              params: { subscribe: () => {} },
              snapshot: { params: { id: '1' } },
            },
          },
          {
            provide: Router,
            useValue: jasmine.createSpyObj('Router', ['navigate']),
          },
        ],
      }).compileComponents();

      const testFixture = TestBed.createComponent(HeroDetailComponent);
      const testComponent = testFixture.componentInstance;

      testComponent.ngOnInit();
      testFixture.detectChanges();

      expect(testComponent.notFound()).toBeTrue();
    });

    it('return false when heroId exists and selectedHero exists', async () => {
      const testHeroesStore = jasmine.createSpyObj(
        'HeroesStore',
        ['clearSelectedHero', 'getHeroById'],
        {
          selectedHero: () => mockHero,
          heroes: () => [mockHero],
        }
      );

      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [HeroDetailComponent],
        providers: [
          { provide: HeroesStore, useValue: testHeroesStore },
          {
            provide: ActivatedRoute,
            useValue: {
              params: { subscribe: () => {} },
              snapshot: { params: { id: '1' } },
            },
          },
          {
            provide: Router,
            useValue: jasmine.createSpyObj('Router', ['navigate']),
          },
        ],
      }).compileComponents();

      const testFixture = TestBed.createComponent(HeroDetailComponent);
      const testComponent = testFixture.componentInstance;

      testComponent.ngOnInit();
      testFixture.detectChanges();

      expect(testComponent.notFound()).toBeFalse();
    });

    it('return undefined when no heroId exists', async () => {
      const testHeroesStore = jasmine.createSpyObj(
        'HeroesStore',
        ['clearSelectedHero', 'getHeroById'],
        {
          selectedHero: () => null,
          heroes: () => [mockHero],
        }
      );

      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [HeroDetailComponent],
        providers: [
          { provide: HeroesStore, useValue: testHeroesStore },
          {
            provide: ActivatedRoute,
            useValue: {
              params: { subscribe: () => {} },
              snapshot: { params: {} },
            },
          },
          {
            provide: Router,
            useValue: jasmine.createSpyObj('Router', ['navigate']),
          },
        ],
      }).compileComponents();

      const testFixture = TestBed.createComponent(HeroDetailComponent);
      const testComponent = testFixture.componentInstance;

      testComponent.ngOnInit();
      testFixture.detectChanges();

      expect(testComponent.notFound()).toBeUndefined();
    });

    it('return false when heroes array is empty', async () => {
      const testHeroesStore = jasmine.createSpyObj(
        'HeroesStore',
        ['clearSelectedHero', 'getHeroById'],
        {
          selectedHero: () => null,
          heroes: () => [],
        }
      );

      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [HeroDetailComponent],
        providers: [
          { provide: HeroesStore, useValue: testHeroesStore },
          {
            provide: ActivatedRoute,
            useValue: {
              params: { subscribe: () => {} },
              snapshot: { params: { id: '1' } },
            },
          },
          {
            provide: Router,
            useValue: jasmine.createSpyObj('Router', ['navigate']),
          },
        ],
      }).compileComponents();

      const testFixture = TestBed.createComponent(HeroDetailComponent);
      const testComponent = testFixture.componentInstance;

      testComponent.ngOnInit();
      testFixture.detectChanges();

      expect(testComponent.notFound()).toBeFalse();
    });
  });
});
