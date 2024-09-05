import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../shared/localstorage.service';
import { AuthUtils } from '../shared/auth.utils';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
  private _user: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private _profile: BehaviorSubject<any | any> = new BehaviorSubject(null);
  private readonly _secret: any;
  private _authenticated: boolean = false;
  private APIURL: string = environment.APIURL;
  private isBrowser: boolean;

  constructor(
    private _LocalStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get users$(): Observable<any[]> {
    return this._users.asObservable();
  }
  get user$(): Observable<any> {
    return this._user.asObservable();
  }
  get profile$(): Observable<any> {
    return this._profile.asObservable();
  }
  async getUsers() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/users`, options);
      const data = await response.json();
      this._users.next(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async getAdmin() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/users/get/admin`, options);
      const data = await response.json();
      // this._users.next(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async Dangky(user: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(`${environment.APIURL}/users/dangky`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async getUserByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/users/${id}`, options);
      const data = await response.json();
      this._users.next(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async updateUser(dulieu: any){
    const users:any = await this.users$.pipe(take(1)).toPromise();
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/users/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // this._users.next(data)
        const updateusers = users.map((v:any) =>
          v.id === data.id ? data : v
        );
        this._users.next(updateusers);
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
  async updateOneUser(dulieu: any) {
    const users:any = await this.users$.pipe(take(1)).toPromise();
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/users/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this._user.next(data)
        const updateusers = users.map((v:any) =>
          v.id === data.id ? data : v
        );
        this._users.next(updateusers);
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
  async changepass(data: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${environment.APIURL}/auth/changepass`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      console.log(data);
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async Randompass(data: any){
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${environment.APIURL}/auth/randompass`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      console.log(data);
      return data
    } catch (error) {
      return console.error(error);
    }
  }
  async getProfile() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._LocalStorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/users/profile`, options);
      const data = await response.json();
      this._user.next(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }

  set accessToken(token: string) {
    if (this.isBrowser) {
      this._LocalStorageService.setItem('token', token);
    }
  }
  get accessToken(): string {
    return this.isBrowser ? (this._LocalStorageService.getItem('token') ?? '') : '';
  }
  async Dangnhap(user: any) {
    if (this._authenticated) {
      return of([false, 'User Đã Đăng Nhập']);
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(`${environment.APIURL}/users/login`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._authenticated = true;
      this.accessToken = data[1].access_token;
      console.log(data);
      return true
    } catch (error) {
      return console.error(error);
    }
  }

  async LoginByGoogle(user: any) {
    if (this._authenticated) {
      return of([false, 'User Đã Đăng Nhập']);
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(`${environment.APIURL}/users/loginbygoogle`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this._authenticated = true;
      this.accessToken = data[1].access_token;
      console.log(data);
      return true
    } catch (error) {
      return console.error(error);
    }
  }
  checkDangnhap(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken || this.accessToken === 'undefined') {
      if (this.isBrowser) {
        this._LocalStorageService.removeItem('token');
      }
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
    // return this.signInUsingToken();
  }
  Dangxuat(): Observable<any> {
    if (this.isBrowser) {
      this._LocalStorageService.removeItem('token');
    }
    this._authenticated = false;
    return of(true);
  }
}
