import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiuTableComponent } from './riu-table.component';

describe('RiuTableComponent', () => {
  let component: RiuTableComponent;
  let fixture: ComponentFixture<RiuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiuTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RiuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RiuTableComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('isActionColumn method', () => {
    it('return true when columnKey is actions', () => {
      const result = component.isActionColumn('actions');
      expect(result).toBe(true);
    });

    it('return false when columnKey is not actions', () => {
      const result = component.isActionColumn('name');
      expect(result).toBe(false);
    });

    it('return false when columnKey is empty', () => {
      const result = component.isActionColumn('');
      expect(result).toBe(false);
    });
  });

  describe('getIconColor method', () => {
    it('return the color when color is provided', () => {
      const result = component.getIconColor('primary');
      expect(result).toBe('primary');
    });

    it('return empty string when color is null', () => {
      const result = component.getIconColor(null as any);
      expect(result).toBe('');
    });

    it('return empty string when color is undefined', () => {
      const result = component.getIconColor(undefined as any);
      expect(result).toBe('');
    });

    it('return empty string when color is empty string', () => {
      const result = component.getIconColor('');
      expect(result).toBe('');
    });
  });

  describe('onActionClick method', () => {
    it('emit actionClicked event with correct data', () => {
      const action = 'edit';
      const row = { id: 1, name: 'Test' };
      spyOn(component.actionClicked, 'emit');

      component.onActionClick(action, row);

      expect(component.actionClicked.emit).toHaveBeenCalledWith({
        action,
        row,
      });
    });

    it('emit actionClicked event with different action and row', () => {
      const action = 'delete';
      const row = { id: 2, name: 'Another Test' };
      spyOn(component.actionClicked, 'emit');

      component.onActionClick(action, row);

      expect(component.actionClicked.emit).toHaveBeenCalledWith({
        action,
        row,
      });
    });
  });
});
