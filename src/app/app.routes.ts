// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) },
  { path: 'app',  loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASH_ROUTES) },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'auth/login' }
];
