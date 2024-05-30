import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HoadonService {
  private _hoadons: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _hoadon: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get hoadons$(): Observable<any[] | null> {
    return this._hoadons.asObservable();
  }
  get hoadon$(): Observable<any | null> {
    return this._hoadon.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  constructor() {}
  async getDrive() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1sofaJI5e9s6TMIvDTk57HktSsumlXPjFSqmwkGD-9zU/values/Thang1?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`,options);
    const data = await response.json();  
          //this._hoadons.next(data)    
          console.log(data);
          
    return  data?.values?.slice(1).map((row:any) => {      
            return {
              shdon: row[0],
              nbten: row[1],
              tdlap: row[3],
              tgtcthue: row[4],
              tgtthue: row[5],
              tgtttbso: row[6]
            };
          });                     
      } catch (error) {
          return console.error(error);
      }
  }
  async getAllHoadon() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/hoadon`,options);
          const data = await response.json(); 
          this._hoadons.next(data)                 
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getHoadonBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/hoadon/findslug/${Slug}`,options);
          const data = await response.json();    
          this._hoadon.next(data)                      
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getHoadonByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/hoadon/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._hoadon.next(data)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchHoadon(SearchParams:any) {    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/hoadon/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._hoadons.next(data.items)              
          this._totalCount.next(data.totalCount)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateHoadon(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/hoadon`, options);          
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
  async SyncHoadon(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/hoadon/sync`, options);          
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
  async UpdateHoadon(item:any) {
    const hoadons:any = await this.hoadons$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/hoadon/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._hoadon.next(data) 
          const updateHoadons = hoadons.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._hoadons.next(updateHoadons);               
          return data;  
      } catch (error) {
          return console.error(error);
      }
  }  
  
  async DeleteHoadon(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/hoadon/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }
}