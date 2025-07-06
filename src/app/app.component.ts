import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesStore } from './core/heroes.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
