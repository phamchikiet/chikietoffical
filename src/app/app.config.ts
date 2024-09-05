import { ApplicationConfig, provideZoneChangeDetection, isDevMode, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { CatcherrorService } from './catcherror.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    AngularFireAuth,
    { provide: ErrorHandler, useClass: CatcherrorService },
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    // { provide: AngularFirestore, useFactory: AngularFirestoreFactory, deps: [AngularFirestoreModule] },
    // { provide: AngularFirestore, useFactory: () => getFirestore(), deps: [FirebaseApp] },
    // { provide: AngularFirestore, useFactory: () => getFirestore(), deps: [AngularFireModule] },
    // { provide: AngularFirestore, useFactory: () => getFirestore(), deps: [FirebaseApp, AngularFireModule] },
    // { provide: AngularFirestore, useFactory: () => getFirestore(), deps: [AngularFireModule, AngularFirestoreModule] },
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })]
};
