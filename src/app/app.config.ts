import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideQuillConfig } from 'ngx-quill';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideQuillConfig({
      modules: {
        syntax: true,
        // toolbar: [...]
      }
    }), provideAnimationsAsync()
  ]
};
