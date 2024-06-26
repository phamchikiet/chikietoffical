import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SitemainComponent } from './main/sitemain/sitemain.component';
import { FacecomparisonComponent } from './facecomparison/facecomparison.component';

export const routes: Routes = [
    { path: '', redirectTo: '/todos', pathMatch: 'full' },
    { path: 'faceapi', component: FacecomparisonComponent},
    // { path: 'about', component: AboutComponent },
    // { path: 'products/:id', component: ProductDetailComponent },
    { path: 'login', component: LoginComponent, 
   // canActivate: [AuthGuard] 
    },
    {
      path: 'ketoan',
      loadComponent: () => import('./ketoan/ketoan.component').then(m => m.KetoanComponent),
      children:[
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
            loadComponent: () => import('./todos/todos.component').then(m => m.TodosComponent),
            children:[
                {
                    path: 'list',
                    loadComponent: () => import('./todos/listview/listview.component').then(m => m.ListviewComponent)
                },
                {
                    path: ':id',
                    loadComponent: () => import('./todos/detail/detail.component').then(m => m.DetailComponent)
                }
            ]
    },
  ];