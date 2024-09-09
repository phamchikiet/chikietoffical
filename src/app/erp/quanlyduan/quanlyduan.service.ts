import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuanlyduanService {
  private _quanlyduans: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _quanlyduan: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _isHaveQuanlyduan: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get isHaveQuanlyduan$(): Observable<any[] | null> {
    return this._isHaveQuanlyduan.asObservable();
  }
  updateisHaveQuanlyduan(value: boolean) {
    this._isHaveQuanlyduan.next(value);
  }
  get quanlyduans$(): Observable<any[] | null> {
    return this._quanlyduans.asObservable();
  }
  get quanlyduan$(): Observable<any | null> {
    return this._quanlyduan.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  constructor() {}
  async getDrive() {
    const DriveID ="1VghpYpLVKug07LJm1-pdcpeQcEoh5VaCOgBvOfQ0-L8"
    const DriveSheet ="users"
    const DriveKey ="AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc"
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/DriveID/values/DriveSheet?key=DriveKey`,options);
    const data = await response.json();
          //this._userss.next(data)
    return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getAllQuanlyduans() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/todo`,options);
          const data = await response.json();
          this._quanlyduans.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getQuanlyduansBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/todo/findslug/${Slug}`,options);
          const data = await response.json();
          this._quanlyduan.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getQuanlyduansByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/todo/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._quanlyduan.next(data)
          this._isHaveQuanlyduan.next(true)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchQuanlyduans(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/todo/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);

          this._quanlyduans.next(data.items)
          this._totalCount.next(data.totalCount)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateQuanlyduans(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/todo`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const Quanlyduans:any = this._quanlyduans.value
          const Update = [data,...Quanlyduans]
          this._quanlyduans.next(Update)
          return Update
      } catch (error) {
          return console.error(error);
      }
  }
  async SyncQuanlyduans(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/todo/sync`, options);
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
  async UpdateQuanlyduans(item:any) {
    const quanlyduans:any = await this.quanlyduans$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/todo/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._quanlyduan.next(data)
          const updateQuanlyduans = quanlyduans.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._quanlyduans.next(updateQuanlyduans);
          return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteQuanlyduans(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/todo/${item.id}`, options);
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}
