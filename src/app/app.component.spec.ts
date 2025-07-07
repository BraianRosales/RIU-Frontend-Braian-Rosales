import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeroesStore } from './core/heroes.store';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [HeroesStore],
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`the appComponent should have the 'RIU Heroes' title in the first render`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('RIU Heroes');
  });

  it('the appComponent should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('RIU Heroes');
  });

  it('inside ngOnInit should load heroes by heroesStore', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const heroesStore = TestBed.inject(HeroesStore);
    spyOn(heroesStore, 'loadHeroes');
    
    fixture.componentInstance.ngOnInit();
    
    expect(heroesStore.loadHeroes).toHaveBeenCalled();
  });
});
