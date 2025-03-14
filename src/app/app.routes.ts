// import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
// import { AuthGuard } from './auth.guard';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/component/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      // {
      //   path: 'uikit',
      //   loadChildren: () => import('./app/pages/uikit/uikit.routes'),
      // },
      // { path: 'documentation', component: Documentation },
      // { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
    ],
  },
  // { path: 'products', component: ProductListComponent },
];
