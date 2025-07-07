import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiuLoadingComponent } from './riu-loading.component';
import { HeroesStore } from '../../../core/heroes.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { signal } from '@angular/core';

describe('RiuLoadingComponent', () => {
  let component: RiuLoadingComponent;
  let fixture: ComponentFixture<RiuLoadingComponent>;
  let mockHeroesStore: jasmine.SpyObj<InstanceType<typeof HeroesStore>>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HeroesStore', [], {
      isLoading: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [RiuLoadingComponent, MatProgressSpinnerModule],
      providers: [
        { provide: HeroesStore, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RiuLoadingComponent);
    component = fixture.componentInstance;
    mockHeroesStore = TestBed.inject(HeroesStore) as jasmine.SpyObj<InstanceType<typeof HeroesStore>>;
  });

  it('should create RiuLoadingComponent', () => {
    expect(component).toBeTruthy();
  });

  it('not show loading overlay when isLoading is false', () => {
    Object.defineProperty(mockHeroesStore, 'isLoading', {
      value: signal(false),
      writable: true
    });

    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay).toBeNull();
  });

  it('show loading overlay when isLoading is true', () => {
    Object.defineProperty(mockHeroesStore, 'isLoading', {
      value: signal(true),
      writable: true
    });

    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay).toBeTruthy();
  });

  it('display spinner when loading', () => {
    Object.defineProperty(mockHeroesStore, 'isLoading', {
      value: signal(true),
      writable: true
    });

    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });

  it('display loading text when loading', () => {
    Object.defineProperty(mockHeroesStore, 'isLoading', {
      value: signal(true),
      writable: true
    });

    fixture.detectChanges();

    const text = fixture.nativeElement.querySelector('.text');
    expect(text).toBeTruthy();
    expect(text.textContent).toContain('Cargando...');
  });

  it('have correct CSS classes', () => {
    Object.defineProperty(mockHeroesStore, 'isLoading', {
      value: signal(true),
      writable: true
    });

    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.overlay');
    expect(overlay.classList).toContain('overlay');
  });
}); 