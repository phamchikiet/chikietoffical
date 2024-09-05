import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, inject, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import * as Auth from 'firebase/auth';
import { environment } from '../../environments/environment';
import { UsersService } from '../users/users.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  token: any;
  _UsersService: UsersService = inject(UsersService);
  _spinner: NgxSpinnerService = inject(NgxSpinnerService);

  constructor(
    private auth: AngularFireAuth,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token') || null;
    }
  }

  ngOnInit(): void {
    this._UsersService.getProfile().then((data) => {
      console.log(data);
    });
  }

  async loginWithGoogle() {
    const GoogleAuthProvider = new Auth.GoogleAuthProvider();
    try {
      this._spinner.show();
      const result = await this.auth.signInWithPopup(GoogleAuthProvider);
      console.log('Logged in:', result.user);
      console.log('Logged in:', result.user?.providerData[0]);
      this._UsersService.LoginByGoogle(result.user?.providerData[0]).then((data) => {
        if (data) {
          this._spinner.hide();
          if (isPlatformBrowser(this.platformId)) {
            window.location.reload();
          }
        }
      });
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Login error:', error);
    }
  }
}
