import { Routes } from '@angular/router';

export const ML_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'forecast' },

  // Succès de mobilité
  {
    path: 'forecast',
    loadComponent: () =>
      import('./pages/forecast.page').then(m => m.ForecastPage),
  },

  // Demande par spécialité
  {
    path: 'spec-forecast',
    loadComponent: () =>
      import('./pages/spec-forecast/spec-forecast.page')
        .then(m => m.SpecForecastPage),
  },

  // Prévision LSTM (nouvelle page)
  {
    path: 'lstm-predict',
    loadComponent: () =>
      import('./pages/lstm-predict/lstm-predict.component')
        .then(m => m.LstmPredictComponent),
  },
];

export default ML_ROUTES;

