// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';
import 'zone.js/node'; // <<< important: en 1ère ligne (SSR)

// L'engine SSR injecte le BootstrapContext dans ce paramètre.
// On le passe tel quel à bootstrapApplication (3e argument).
export default (bootstrap: unknown) =>
  bootstrapApplication(AppComponent, config, bootstrap as any);
