import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full',
    },
    {
        path: 'heroes',
        loadComponent: () => import('./pages/hero-list/hero-list.component').then( (c) => c.HeroListComponent)
    },
    {
        path: 'heroes/:id',
        loadComponent: () => import('./pages/hero-detail/hero-detail.component').then((m) => m.HeroDetailComponent)
    },
    {
        path: '**',
        redirectTo: 'heroes',
    },
];
