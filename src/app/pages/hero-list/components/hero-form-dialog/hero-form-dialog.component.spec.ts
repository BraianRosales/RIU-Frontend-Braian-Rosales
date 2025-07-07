import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroFormDialogComponent } from './hero-form-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Hero } from '../../../../core/models/hero.model';

describe('HeroFormDialogComponent', () => {
  let component: HeroFormDialogComponent;
  let fixture: ComponentFixture<HeroFormDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<DialogRef<any>>;
  let mockData: { hero?: Hero };

  const mockHero: Hero = {
    id: 1,
    name: 'Superman',
    power: 'Super Strength',
    universe: 'DC',
    level: 90,
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('DialogRef', ['close']);
    mockData = {};

    await TestBed.configureTestingModule({
      imports: [HeroFormDialogComponent, ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: DIALOG_DATA, useValue: mockData },
        { provide: DialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create HeroFormDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit hook', () => {
    it('this initialize form in create mode when no hero data', () => {
      component.data = {};
      component.ngOnInit();

      expect(component.isEditMode).toBeFalse();
      expect(component.heroForm).toBeDefined();
      expect(component.heroForm.get('name')?.value).toBe('');
    });

    it('initialize form in edit mode when hero data is provided', () => {
      component.data = { hero: mockHero };
      component.ngOnInit();

      expect(component.isEditMode).toBeTrue();
      expect(component.heroForm.get('name')?.value).toBe(mockHero.name);
      expect(component.heroForm.get('power')?.value).toBe(mockHero.power);
      expect(component.heroForm.get('universe')?.value).toBe(mockHero.universe);
      expect(component.heroForm.get('level')?.value).toBe(mockHero.level);
    });
  });

  describe('onSubmit method', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('close dialog with hero data when form is valid in create mode', () => {
      component.isEditMode = false;
      component.heroForm.patchValue({
        name: 'Batman',
        power: 'Intelligence',
        universe: 'DC',
        level: 85,
      });

      component.onSubmit();

      expect(mockDialogRef.close).toHaveBeenCalledWith({
        name: 'Batman',
        power: 'Intelligence',
        universe: 'DC',
        level: 85,
      });
    });

    it('close dialog with hero data when form is valid in edit mode', () => {
      component.isEditMode = true;
      component.data = { hero: mockHero };
      component.heroForm.patchValue({
        name: 'Updated Batman',
        power: 'Intelligence',
        universe: 'DC',
        level: 85,
      });

      component.onSubmit();

      expect(mockDialogRef.close).toHaveBeenCalledWith({
        id: mockHero.id,
        name: 'Updated Batman',
        power: 'Intelligence',
        universe: 'DC',
        level: 85,
      });
    });

    it('mark form as touched when form is invalid', () => {
      spyOn(component.heroForm, 'markAsTouched');
      spyOn(component as any, 'markFormGroupTouched');

      component.heroForm.patchValue({
        name: '',
        power: '',
        universe: '',
        level: 0,
      });

      component.onSubmit();

      expect(mockDialogRef.close).not.toHaveBeenCalled();
      expect((component as any).markFormGroupTouched).toHaveBeenCalled();
    });
  });

  describe('onCancel method', () => {
    it('close dialog without data', () => {
      component.onCancel();
      expect(mockDialogRef.close).toHaveBeenCalledWith();
    });
  });

  describe('markFormGroupTouched method', () => {
    it('mark all form controls as touched', () => {
      component.ngOnInit();
      spyOn(component.heroForm.get('name')!, 'markAsTouched');
      spyOn(component.heroForm.get('power')!, 'markAsTouched');
      spyOn(component.heroForm.get('universe')!, 'markAsTouched');
      spyOn(component.heroForm.get('level')!, 'markAsTouched');

      (component as any).markFormGroupTouched();

      expect(component.heroForm.get('name')?.markAsTouched).toHaveBeenCalled();
      expect(component.heroForm.get('power')?.markAsTouched).toHaveBeenCalled();
      expect(
        component.heroForm.get('universe')?.markAsTouched
      ).toHaveBeenCalled();
      expect(component.heroForm.get('level')?.markAsTouched).toHaveBeenCalled();
    });
  });

  describe('getter methods', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('this return name control', () => {
      expect(component.nameControl).toBe(component.heroForm.get('name'));
    });

    it('this return power control', () => {
      expect(component.powerControl).toBe(component.heroForm.get('power'));
    });

    it('this return universe control', () => {
      expect(component.universeControl).toBe(
        component.heroForm.get('universe')
      );
    });

    it('this return level control', () => {
      expect(component.levelControl).toBe(component.heroForm.get('level'));
    });
  });

  describe('universes array', () => {
    it('should have correct universe options', () => {
      expect(component.universes).toEqual([
        { value: 'DC', label: 'DC Comics' },
        { value: 'Marvel', label: 'Marvel Comics' },
      ]);
    });
  });
});
