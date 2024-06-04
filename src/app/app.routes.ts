import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SitemainComponent } from './main/sitemain/sitemain.component';
import { FacecomparisonComponent } from './facecomparison/facecomparison.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: SitemainComponent},
    { path: 'faceapi', component: FacecomparisonComponent},
    // { path: 'about', component: AboutComponent },
    // { path: 'products/:id', component: ProductDetailComponent },
    { path: 'login', component: LoginComponent, 
   // canActivate: [AuthGuard] 
    },
  ];