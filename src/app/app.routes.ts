import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'ketoan',
        pathMatch: 'full'
    },
    {
        path: 'ketoan',
        loadComponent: () => import('./ketoan/ketoan.component').then(m => m.KetoanComponent),
        children:[
            {
                path: 'hoadon',
                loadComponent: () => import('./ketoan/hoadon/hoadon.component').then(m => m.HoadonComponent)
            },
        ]
    },
];


