import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, inject, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import  * as Auth  from 'firebase/auth';
import { environment } from '../../environments/environment.development';
import { UsersService } from '../users/users.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  token: any = localStorage.getItem('token') || null
  _UsersService:UsersService = inject(UsersService)
  constructor(private auth: AngularFireAuth) {}
  ngOnInit(): void {
    this._UsersService.getProfile().then((data)=>{console.log(data);
    })
  }
  async loginWithGoogle() {
    const GoogleAuthProvider = new Auth.GoogleAuthProvider();
    try {
     const result = await this.auth.signInWithPopup(GoogleAuthProvider);
     console.log('Logged in:', result.user);
     console.log('Logged in:', result.user?.providerData[0]);
     this._UsersService.LoginByGoogle(result.user?.providerData[0]).then((data)=>
    {
      if(data){
        window.location.reload()
      }
    })
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Login error:', error);
    }
  }
}
