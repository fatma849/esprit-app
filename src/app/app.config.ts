// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// ⬅️ ajoute withFetch
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // ⬅️ active fetch pour HttpClient (recommandé en SSR)
    provideHttpClient(withFetch()),
  ],
};
