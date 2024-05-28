import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IMAGE_CONFIG } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AuthService } from './admin/users/auth/auth.service';
import { CustomPaginatorIntl } from './shared/CustomPaginator';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(), 
    provideAnimations(),
    {
        provide: IMAGE_CONFIG,
        useValue: {
            disableImageSizeWarning: true,
            disableImageLazyLoadWarning: true
        }
    },
    AuthService,
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    provideAnimationsAsync(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })]
};
