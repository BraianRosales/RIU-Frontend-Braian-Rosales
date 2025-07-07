import { Component, inject, computed, OnInit } from '@angular/core';
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
export class HeroDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  heroesStore = inject(HeroesStore);

  hero = computed(() => {
    return this.heroesStore.selectedHero();
  });

  notFound = computed(() => {
    const heroId = this.route.snapshot.params['id'];
    const heroes = this.heroesStore.heroes();
    const selectedHero = this.heroesStore.selectedHero();
    return heroes.length > 0 && heroId && !selectedHero;
  });

  ngOnInit(): void {
    const heroId = this.route.snapshot.params['id'];
    if (heroId) {
      this.heroesStore.getHeroById(+heroId);
    }
  }

  goBack(): void {
    this.heroesStore.clearSelectedHero();
    this.router.navigate(['/heroes']);
  }
}
