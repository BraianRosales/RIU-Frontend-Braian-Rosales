import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormDialogComponent } from './hero-form-dialog.component';

describe('HeroFormDialogComponent', () => {
  let component: HeroFormDialogComponent;
  let fixture: ComponentFixture<HeroFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
