import { Routes } from '@angular/router';
import { AppShellComponent } from './shell/app-shell.component';

export const DASH_ROUTES: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      // Accueil
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
      },

      // Dashboards 1..5
      { path: 'dash1', loadComponent: () => import('./pages/dash1.page').then(m => m.Dash1Page) },
      { path: 'dash2', loadComponent: () => import('./pages/dash2.page').then(m => m.Dash2Page) },
      { path: 'dash3', loadComponent: () => import('./pages/dash3.page').then(m => m.Dash3Page) },
      { path: 'dash4', loadComponent: () => import('./pages/dash4.page').then(m => m.Dash4Page) },
      { path: 'dash5', loadComponent: () => import('./pages/dash5.page').then(m => m.Dash5Page) },
      { path: 'dash6', loadComponent: () => import('./pages/dash6.page').then(m => m.Dash6Page) },
      { path: 'dash7', loadComponent: () => import('./pages/dash7.page').then(m => m.Dash7Page) },
      { path: 'dash8', loadComponent: () => import('./pages/dash8.page').then(m => m.Dash8Page) },

      // ML
      {
        path: 'ml/forecast',
        loadComponent: () => import('../ml/pages/forecast.page').then(m => m.ForecastPage),
      },
     {
  path: 'ml/lstm-predict',
  loadComponent: () =>
    import('../ml/pages/lstm-predict/lstm-predict.component')
      .then(m => m.LstmPredictComponent),
},
{
  path: 'ml/sarima_nbinsc',
  loadComponent: () =>
    import('../ml/pages/sarima_nbinsc/sarima_nbinsc.component')
      .then(m => m.SarimaNbinscComponent ),
},



      {
  path: 'ml/spec-forecast',
  loadComponent: () =>
    import('../ml/pages/spec-forecast/spec-forecast.page')
      .then(m => m.SpecForecastPage),
},


      { path: '**', redirectTo: '' },
    ],
  },
];
