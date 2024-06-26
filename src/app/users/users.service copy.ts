import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap, take, switchMap, map, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LocalStorageService } from '../shared/localstorage.service';
import { AuthUtils } from '../shared/auth.utils';

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
  constructor(
    private _httpClient: HttpClient,
    private _userService: UsersService,
    private _LocalStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { 

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
  getUsers(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/users`).pipe(
      tap((ves: any[]) => {
        this._users.next(ves);
      })
    );
  }
  getAdmin(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${this.APIURL}/users/get/admin`).pipe(
      tap((ves: any[]) => {
        return ves
      })
    );
  }
  Dangky(user: any): Observable<any> {
    return this._httpClient.post<any>(`${this.APIURL}/users/dangky`, user);
  }
  getUserByid(id: any): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/users/${id}`).pipe(
      tap((response: any) => {
        this._user.next(response);
        return response;
      })
    );
  }
  updateUser(dulieu: any): Observable<any> {
    return this.users$.pipe(
      take(1),
      switchMap((Users: any) =>
        this._httpClient.patch(`${this.APIURL}/users/${dulieu.id}`, dulieu).pipe(
          map((user: any) => {
            const index = Users.findIndex((item: any) => item.id === user.id);
            Users[index] = user;
            this._users.next(Users);
            return user;
          })
        )
      )
    );
  }
  updateOneUser(dulieu: any): Observable<any> {
    return this._httpClient.patch(`${this.APIURL}/users/${dulieu.id}`, dulieu).pipe(
      map((user: any) => {
        this._profile.next(user);
      })
    )
  }
  changepass(data: any): Observable<any> {
    return this._httpClient.post(`${this.APIURL}/auth/changepass`, data).pipe(
      tap((response: any) => {
        return response;
      })
    );
  }
  Randompass(data: any): Observable<any> {
    return this._httpClient.post(`${this.APIURL}/auth/randompass`, data).pipe(
      tap((response: any) => {
        return response;
      })
    );
  }
  getProfile(): Observable<any> {
    return this._httpClient.get<any>(`${this.APIURL}/auth/profile`).pipe(
      tap((response: any) => {
        this._profile.next(response);
      })
    );
  }

  set accessToken(token: string) {
    this._LocalStorageService.setItem('token', token);
  }
  get accessToken(): string {
   return this._LocalStorageService.getItem('token') ?? '';
  }
  Dangnhap(user: any): Observable<any> {
    if (this._authenticated) {
      return of([false, 'User Đã Đăng Nhập']);
    }
    return this._httpClient.post(`${this.APIURL}/auth/login`, user).pipe(
      switchMap((response: any) => {
        if (response[0]) {
          this._authenticated = true;
          this.accessToken = response[1].access_token;
        }
        return of(response);
      })
    );
  }
  checkDangnhap(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }
    if (!this.accessToken || this.accessToken === 'undefined') {
      this._LocalStorageService.removeItem('token')
      return of(false);
    }
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
    // return this.signInUsingToken();
  }
  Dangxuat(): Observable<any> {
    this._LocalStorageService.removeItem('token')
    this._authenticated = false;
    return of(true);
  }
}
