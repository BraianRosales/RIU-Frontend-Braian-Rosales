import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesStore } from './core/heroes.store';
import { RiuLoadingComponent } from './shared/components/riu-loading/riu-loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RiuLoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'RIU Heroes';
  private heroesStore = inject(HeroesStore);

  ngOnInit(): void {
    this.heroesStore.loadHeroes();
  }
}
