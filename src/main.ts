import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';  // Importation de la configuration
import { AppComponent } from './app/app.component';  // Importation du composant principal

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));  // Gestion des erreurs de démarrage
