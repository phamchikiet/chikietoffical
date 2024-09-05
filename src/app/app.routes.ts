import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SitemainComponent } from './main/sitemain/sitemain.component';
import { FacecomparisonComponent } from './facecomparison/facecomparison.component';
import { AuthGuard } from './users/guards/auth.guard';
import { GuestGuard } from './users/guards/guest.guard';
import { HomepageComponent } from './main/homepage/homepage.component';
import { ProfileComponent } from './users/profile/profile.component';

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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full'
      },
      {
        path: 'account',
        loadComponent: () => import('./users/profile/account/account.component').then(m => m.AccountComponent)
      },
      {
        path: 'password',
        loadComponent: () => import('./users/profile/password/password.component').then(m => m.PasswordComponent)
      },
      {
        path: 'social',
        loadComponent: () => import('./users/profile/social/social.component').then(m => m.SocialComponent)
      },
      {
        path: 'privacy',
        loadComponent: () => import('./users/profile/privacy/privacy.component').then(m => m.PrivacyComponent)
      },
      {
        path: 'terms',
        loadComponent: () => import('./users/profile/terms/terms.component').then(m => m.TermsComponent)
      },
    ]
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
  {
    path: 'erp',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./erp/erp.component').then(m => m.ErpComponent),
    // children: [
    //   {
    //     path: 'list/:slug',
    //     loadComponent: () => import('./todos/listview/listview.component').then(m => m.ListviewComponent),
    //     children: [
    //       {
    //         path: 'detail/:id',
    //         loadComponent: () => import('./todos/detail/detail.component').then(m => m.DetailComponent)
    //       }
    //     ]
    //   },
    // ]
  },
  {
    path: 'quanlyduan',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./erp/quanlyduan/quanlyduan.component').then(m => m.QuanlyduanComponent),
    children: [
      {
        path: 'list/:slug',
        loadComponent: () => import('./erp/quanlyduan/listview/listview.component').then(m => m.ListviewComponent),
        children: [
          {
            path: 'detail/:id',
            loadComponent: () => import('./erp/quanlyduan/detail/detail.component').then(m => m.DetailComponent)
          }
        ]
      },
      {
        path: 'task/:id',
        loadComponent: () => import('./erp/quanlyduan/detail/detail.component').then(m => m.DetailComponent)
      }
    ]
  },
];
