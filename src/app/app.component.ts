import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../environments/environment.development';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgxSpinnerModule,
    AngularFireStorageModule
  ],
  providers: [
    AngularFireAuth,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fechikiet';
  isBrowser: boolean;
  isServer: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private spinner: NgxSpinnerService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
    this.spinner.show();
  }
  ngOnInit(): void {
    if(!this.isServer)
    {
      this.spinner.hide();
    }

  }
}
