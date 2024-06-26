import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  * as Auth  from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private afAuth: AngularFireAuth) {}

  googleLogin() {
    const provider = new Auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

}
