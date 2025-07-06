import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiuTableComponent } from './riu-table.component';

describe('RiuTableComponent', () => {
  let component: RiuTableComponent;
  let fixture: ComponentFixture<RiuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiuTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
