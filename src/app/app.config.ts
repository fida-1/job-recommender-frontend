import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Configuration HTTP
import { routes } from './app-routing.module';  // Les routes de l'application

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),        // Fournit les routes de l'application
    provideHttpClient(withFetch())  // Configuration pour HTTP
  ]
};
