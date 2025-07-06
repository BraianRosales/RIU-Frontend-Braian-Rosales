import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesStore } from '../../core/heroes.store';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../shared/material-ui.imports';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
  imports: [CommonModule, ...MATERIAL_IMPORTS],
})
export class HeroDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  heroesStore = inject(HeroesStore);

  hero = computed(() => {
    const heroId = this.route.snapshot.params['id'];
    if (heroId) {
      return this.heroesStore.getHeroById(+heroId);
    }
    return null;
  });

  notFound = computed(() => {
    const heroId = this.route.snapshot.params['id'];
    const heroes = this.heroesStore.heroes();
    return heroes.length > 0 && heroId && !this.hero();
  });

  goBack(): void {
    this.router.navigate(['/heroes']);
  }
}
