import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroesStore } from '../../core/heroes.store';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertDialogService } from '../../shared/services/alert-dialog.service';
import { Router } from '@angular/router';
import { Hero } from '../../core/models/hero.model';
import { of } from 'rxjs';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let mockHeroesStore: jasmine.SpyObj<any>;
  let mockDialog: any;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockAlertDialog: jasmine.SpyObj<AlertDialogService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockHero: Hero = {
    id: 1,
    name: 'Superman',
    power: 'Super Strength',
    universe: 'DC',
    level: 90,
  };

  beforeEach(async () => {
    mockHeroesStore = jasmine.createSpyObj(
      'HeroesStore',
      ['setQuery', 'addHero', 'updateHero', 'deleteHero'],
      {
        filteredHeroes: () => [mockHero],
      }
    );
    mockDialog = {
      open: jasmine.createSpy('open').and.callFake(() => ({
        closed: of(undefined),
      })),
    };
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockAlertDialog = jasmine.createSpyObj('AlertDialogService', [
      'confirmDelete',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HeroListComponent],
      providers: [
        { provide: HeroesStore, useValue: mockHeroesStore },
        { provide: Dialog, useValue: mockDialog },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: AlertDialogService, useValue: mockAlertDialog },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;

    // Manually inject mock so that the snackbar works correctly.
    (component as any).snackBar = mockSnackBar;

    fixture.detectChanges();
  });

  it('should create HeroListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('test have snackBar injected', () => {
    expect(component.snackBar).toBeDefined();
    expect(component.snackBar).toBe(mockSnackBar);
  });

  describe('searchHero method', () => {
    it('call heroesStore.setQuery with the search term', () => {
      const searchTerm = 'superman';
      component.searchHero(searchTerm);
      expect(mockHeroesStore.setQuery).toHaveBeenCalledWith(searchTerm);
    });
  });

  describe('handleTableAction method', () => {
    beforeEach(() => {
      mockSnackBar.open.calls.reset();
    });

    it('call showHeroDetail when action is detail', () => {
      spyOn(component, 'showHeroDetail');
      component.handleTableAction({ action: 'detail', row: mockHero });
      expect(component.showHeroDetail).toHaveBeenCalledWith(mockHero);
    });

    it('call editHero when action is edit', () => {
      spyOn(component, 'editHero');
      component.handleTableAction({ action: 'edit', row: mockHero });
      expect(component.editHero).toHaveBeenCalledWith(mockHero);
    });

    it('call deleteHero when action is delete', () => {
      spyOn(component, 'deleteHero');
      component.handleTableAction({ action: 'delete', row: mockHero });
      expect(component.deleteHero).toHaveBeenCalledWith(mockHero);
    });

    it('call handleTableAction method correctly', () => {
      expect(typeof component.handleTableAction).toBe('function');
      spyOn(component, 'showHeroDetail');
      component.handleTableAction({ action: 'detail', row: mockHero });
      expect(component.showHeroDetail).toHaveBeenCalled();
    });

    it('show snackbar for unrecognized action', () => {
      mockSnackBar.open.calls.reset();
      component.handleTableAction({ action: 'unknown', row: mockHero });
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Acción no reconocida',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });
  });

  describe('addHero method', () => {
    it('open dialog and handle successful hero addition', () => {
      const newHero = {
        name: 'Batman',
        power: 'Intelligence',
        universe: 'DC',
        level: 85,
      };

      spyOn(component.dialog, 'open').and.returnValue({
        closed: of(newHero),
      } as any);

      component.addHero();

      expect(component.dialog.open).toHaveBeenCalledWith(
        jasmine.any(Function),
        {
          width: '500px',
          data: {},
        }
      );
      expect(mockHeroesStore.addHero).toHaveBeenCalledWith(newHero);
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Batman fue agregado',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });

    it('handle dialog result with id (edit mode result)', () => {
      const heroWithId = { ...mockHero, name: 'Updated Superman' };

      spyOn(component.dialog, 'open').and.returnValue({
        closed: of(heroWithId),
      } as any);

      component.addHero();

      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'No se pudo agregar el héroe',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });

    it('handle undefined dialog result', () => {
      spyOn(component.dialog, 'open').and.returnValue({
        closed: of(undefined),
      } as any);

      component.addHero();

      expect(mockHeroesStore.addHero).not.toHaveBeenCalled();
      expect(mockSnackBar.open).not.toHaveBeenCalled();
    });
  });

  describe('editHero method', () => {
    it('open dialog and handle successfull hero update', () => {
      const updatedHero = { ...mockHero, name: 'Updated Superman' };

      spyOn(component.dialog, 'open').and.returnValue({
        closed: of(updatedHero),
      } as any);

      component.editHero(mockHero);

      expect(component.dialog.open).toHaveBeenCalledWith(
        jasmine.any(Function),
        {
          width: '500px',
          data: { hero: mockHero },
        }
      );
      expect(mockHeroesStore.updateHero).toHaveBeenCalledWith(updatedHero);
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Updated Superman fue actualizado',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });

    it('handle dialog result without id (create mode result)', () => {
      const heroWithoutId = {
        name: 'New Hero',
        power: 'Power',
        universe: 'DC',
        level: 50,
      };

      // Mock the dialog subscription directly
      spyOn(component.dialog, 'open').and.returnValue({
        closed: of(heroWithoutId),
      } as any);

      component.editHero(mockHero);

      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'No se pudo actualizar el héroe',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });

    it('handle undefined dialog result', () => {
      spyOn(component.dialog, 'open').and.returnValue({
        closed: of(undefined),
      } as any);

      component.editHero(mockHero);

      expect(mockHeroesStore.updateHero).not.toHaveBeenCalled();
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'No se pudo actualizar el héroe',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });
  });

  describe('deleteHero method', () => {
    it('delete hero when confirmation is true', (done) => {
      mockAlertDialog.confirmDelete.and.returnValue(of(true));
      component.deleteHero(mockHero);

      setTimeout(() => {
        expect(mockAlertDialog.confirmDelete).toHaveBeenCalledWith(
          mockHero.name
        );
        expect(mockHeroesStore.deleteHero).toHaveBeenCalledWith(mockHero.id);
        expect(mockSnackBar.open).toHaveBeenCalledWith(
          'Superman fue eliminado',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
        done();
      }, 0);
    });

    it('should not delete hero when confirmation is false', (done) => {
      mockAlertDialog.confirmDelete.and.returnValue(of(false));

      component.deleteHero(mockHero);

      setTimeout(() => {
        expect(mockAlertDialog.confirmDelete).toHaveBeenCalledWith(
          mockHero.name
        );
        expect(mockHeroesStore.deleteHero).not.toHaveBeenCalled();
        expect(mockSnackBar.open).not.toHaveBeenCalled();
        done();
      }, 0);
    });
  });

  describe('showHeroDetail method', () => {
    it('this method should navigate to hero detail page', () => {
      component.showHeroDetail(mockHero);

      expect(mockRouter.navigate).toHaveBeenCalledWith([
        '/heroes',
        mockHero.id,
      ]);
    });
  });

  describe('component properties', () => {
    it('this have correct displayedColumns', () => {
      expect(component.displayedColumns).toEqual([
        'name',
        'power',
        'universe',
        'level',
        'actions',
      ]);
    });

    it('this have correct columnTitles', () => {
      expect(component.columnTitles).toEqual({
        name: 'Nombre',
        power: 'Poder Principal',
        universe: 'Universo',
        level: 'Nivel',
        actions: 'Acciones',
      });
    });

    it('this have correct tableActions', () => {
      expect(component.tableActions).toEqual([
        {
          name: 'Ver detalle',
          icon: 'visibility',
          color: 'accent',
          action: 'detail',
        },
        {
          name: 'Editar',
          icon: 'edit',
          color: 'primary',
          action: 'edit',
        },
        {
          name: 'Eliminar',
          icon: 'delete',
          color: 'warn',
          action: 'delete',
        },
      ]);
    });
  });
});
