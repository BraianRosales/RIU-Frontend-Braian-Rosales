import { ComponentFixture, TestBed } from '@angular/core/testing';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
