import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/main/main').then(m => m.Main) },
    { path: 'search', loadComponent: () => import('./pages/search/search-page').then(m => m.SearchPage) },
    { path: 'auth', loadComponent: () => import('./components/auth/auth').then(m => m.Auth) },
    { path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile) },
    { path: 'rating/:productId', loadComponent: () => import('./components/rating/rating').then(m => m.Rating) },
    { path: '**', redirectTo: '' },
];