import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RiuSearcherComponent } from './riu-searcher.component';

describe('RiuSearcherComponent', () => {
  let component: RiuSearcherComponent;
  let fixture: ComponentFixture<RiuSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiuSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiuSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RiuSearcherComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('search functionality', () => {
    it('emit search value when control value changes', fakeAsync(() => {
      spyOn(component.searchChanged, 'emit');
      
      component.ngOnInit();
      component.searchControl.setValue('test search');
      
      tick(500);
      
      expect(component.searchChanged.emit).toHaveBeenCalledWith('test search');
    }));

    it('emit empty string when control value is null', fakeAsync(() => {
      spyOn(component.searchChanged, 'emit');
      
      component.ngOnInit();
      component.searchControl.setValue(null);
      
      tick(500);
      
      expect(component.searchChanged.emit).toHaveBeenCalledWith('');
    }));

    it('emit empty string when control value is undefined', fakeAsync(() => {
      spyOn(component.searchChanged, 'emit');
      
      component.ngOnInit();
      component.searchControl.setValue(undefined as any);
      
      tick(500);
      
      expect(component.searchChanged.emit).toHaveBeenCalledWith('');
    }));

    it('not emit immediately due to debounceTime', fakeAsync(() => {
      spyOn(component.searchChanged, 'emit');
      
      component.ngOnInit();
      component.searchControl.setValue('test search');
      
      expect(component.searchChanged.emit).not.toHaveBeenCalled();
      
      tick(500);
      expect(component.searchChanged.emit).toHaveBeenCalledWith('test search');
    }));

    it('emit search value when control value changes', fakeAsync(() => {
      spyOn(component.searchChanged, 'emit');
      
      component.ngOnInit();
      component.searchControl.setValue('test search');
      
      tick(500);
      
      expect(component.searchChanged.emit).toHaveBeenCalledWith('test search');
    }));
  });
});
