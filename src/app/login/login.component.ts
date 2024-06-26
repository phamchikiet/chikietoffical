import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import  * as Auth  from 'firebase/auth';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [
    AngularFireAuth,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth: AngularFireAuth) {}  // Inject if using the service

  async loginWithGoogle() {
    const GoogleAuthProvider = new Auth.GoogleAuthProvider();
    try {
     const result = await this.auth.signInWithPopup(GoogleAuthProvider);
     console.log('Logged in:', result.user);
     console.log('Logged in:', result.user?.providerData[0]);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Login error:', error);
    }
  }
}
