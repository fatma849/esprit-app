// src/app/app.config.server.ts
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { provideServerRendering } from '@angular/platform-server';

export const config: ApplicationConfig = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering()],
});
