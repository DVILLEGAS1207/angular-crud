// import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/component/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'pages', loadChildren: () => import('./pages/pages.routes') },
    ],
  },
  { path: 'notfound', component: NotfoundComponent },
  // { path: 'products', component: ProductListComponent },
];
