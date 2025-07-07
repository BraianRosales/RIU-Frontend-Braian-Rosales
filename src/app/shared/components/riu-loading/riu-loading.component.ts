import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroesStore } from '../../../core/heroes.store';

@Component({
  selector: 'riu-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (heroesStore.isLoading()) {
      <div class="overlay">
        <mat-spinner diameter="50"></mat-spinner>
        <p class="text">Cargando...</p>
      </div>
    }
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .text {
        color: white;
        margin-top: 1rem;
        font-size: 1rem;
      }
    `,
  ],
})
export class RiuLoadingComponent {
  heroesStore = inject(HeroesStore);
}
