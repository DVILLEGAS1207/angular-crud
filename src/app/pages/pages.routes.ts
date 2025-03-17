import { Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';

export default [
  { path: 'crud', component: CrudComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
