import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Hero } from '../../../../core/models/hero.model';
import { MATERIAL_IMPORTS } from '../../../../shared/material-ui.imports';

@Component({
  selector: 'app-hero-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
  ],
  templateUrl: './hero-form-dialog.component.html',
  styleUrl: './hero-form-dialog.component.scss'
})
export class HeroFormDialogComponent implements OnInit {
  dialogRef = inject<DialogRef<Hero>>(DialogRef<Hero>);
  data = inject<{ hero?: Hero }>(DIALOG_DATA);
  private fb = inject(FormBuilder);
  heroForm!: FormGroup;
  isEditMode = false;

  universes = [
    { value: 'DC', label: 'DC Comics' },
    { value: 'Marvel', label: 'Marvel Comics' }
  ];

  ngOnInit() {
    this.isEditMode = !!this.data.hero;
    this.initForm();
  }

  private initForm() {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      power: ['', [Validators.required]],
      universe: ['', Validators.required],
      level: [50, [Validators.required, Validators.min(1), Validators.max(100)]]
    });

    // If we are in edit mode, load the hero data.
    if (this.isEditMode && this.data.hero) {
      this.heroForm.patchValue(this.data.hero);
    }
  }

  onSubmit() {
    if (this.heroForm.valid) {
      const heroData: Hero = {
        id: this.isEditMode ? this.data.hero!.id : this.generateId(),
        ...this.heroForm.value
      };
      
      this.dialogRef.close(heroData);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000) + 1000;
  }

  private markFormGroupTouched() {
    Object.keys(this.heroForm.controls).forEach(key => {
      const control = this.heroForm.get(key);
      control?.markAsTouched();
    });
  }

  get nameControl() {
    return this.heroForm.get('name');
  }

  get powerControl() {
    return this.heroForm.get('power');
  }

  get universeControl() {
    return this.heroForm.get('universe');
  }

  get levelControl() {
    return this.heroForm.get('level');
  }
}
