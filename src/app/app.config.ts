import { ApplicationConfig, provideZoneChangeDetection, isDevMode, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { CatcherrorService } from './catcherror.service';
export const appConfig: ApplicationConfig = {
  providers: [
    // { provide: ErrorHandler, useClass: CatcherrorService },
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })]
};
