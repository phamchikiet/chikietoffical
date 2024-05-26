import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'ketoan',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./ketoan/ketoan.component').then(m => m.KetoanComponent)
    },
    {
        path: 'ketoan',
        loadComponent: () => import('./ketoan/ketoan.component').then(m => m.KetoanComponent)
    },
];


