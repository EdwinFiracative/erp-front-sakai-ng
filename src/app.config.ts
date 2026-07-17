import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { APP_SETTINGS, appSettings } from './app.settings';

import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideKeycloakAngular } from './keycloak.config';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch(), withInterceptors([includeBearerTokenInterceptor])),
        provideZonelessChangeDetection(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        // Initializes Keycloak and authentication integration for Angular.
        provideKeycloakAngular(),
        // Exposes typed application settings through Dependency Injection.
        { provide: APP_SETTINGS, useValue: appSettings }
    ]
};;;
