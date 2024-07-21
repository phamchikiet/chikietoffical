import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FirebaseimageComponent } from './firebaseimage/firebaseimage.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgxSpinnerModule,
    FirebaseimageComponent
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
