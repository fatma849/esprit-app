import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
import 'zone.js'; // <<< important: en 1ère ligne

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
