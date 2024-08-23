import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SitemainComponent } from './main/sitemain/sitemain.component';
import { FacecomparisonComponent } from './facecomparison/facecomparison.component';
import { AuthGuard } from './users/guards/auth.guard';
import { GuestGuard } from './users/guards/guest.guard';
import { HomepageComponent } from './main/homepage/homepage.component';

export const routes: Routes = [
  //{ path: '', redirectTo: '/todos', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./main/homepage/homepage.component').then(m => m.HomepageComponent)
  },
  { path: 'faceapi', component: FacecomparisonComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'products/:id', component: ProductDetailComponent },
  {
    path: 'login', component: LoginComponent,
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
  },
  {
    path: 'ketoan',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./ketoan/ketoan.component').then(m => m.KetoanComponent),
    children: [
      {
        path: 'hoadon',
        loadComponent: () => import('./ketoan/hoadon/hoadon.component').then(m => m.HoadonComponent)
      },
      {
        path: 'hoadonchitiet',
        loadComponent: () => import('./ketoan/hoadonchitiet/hoadonchitiet.component').then(m => m.HoadonchitietComponent)
      },
    ]
  },
  {
    path: 'todos',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./todos/todos.component').then(m => m.TodosComponent),
    children: [
      {
        path: 'list/:slug',
        loadComponent: () => import('./todos/listview/listview.component').then(m => m.ListviewComponent),
        children: [
          {
            path: 'detail/:id',
            loadComponent: () => import('./todos/detail/detail.component').then(m => m.DetailComponent)
          }
        ]
      },
    ]
  },
];
