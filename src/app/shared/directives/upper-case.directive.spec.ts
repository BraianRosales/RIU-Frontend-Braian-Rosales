import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './upper-case.directive';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UppercaseDirective],
  template: `<input [formControl]="control" appUppercase />`
})
class TestHostComponent {
  control = new FormControl('');
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let input: HTMLInputElement;
  let component: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('must transform text to uppercase while typing', () => {
    input.value = 'batman';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toBe('BATMAN');
    expect(component.control.value).toBe('BATMAN');
  });

  it('this is the case that work with initial values', () => {
    component.control.setValue('superman');
    fixture.detectChanges();
    expect(input.value).toBe('SUPERMAN');
    expect(component.control.value).toBe('SUPERMAN');
  });
}); 