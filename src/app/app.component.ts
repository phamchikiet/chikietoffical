import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FirebaseimageComponent } from './firebaseimage/firebaseimage.component';
import { NotifierService } from 'angular-notifier';
import { NotifyModule } from './notify.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgxSpinnerModule,
    FirebaseimageComponent,
    NotifyModule,
  ],
  providers: [NotifierService],
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
  notifier: NotifierService = inject(NotifierService);
  ngOnInit(): void {
    if(!this.isServer)
    {
   //  this.notifier.notify('success', 'You are awesome! I mean it!');
      this.spinner.hide();
    }
   // this.notifier.notify('success', 'You are awesome! I mean it!');
  }
}
