import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private _todoss: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _todos: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _isHaveTodo: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get isHaveTodo$(): Observable<any[] | null> {
    return this._isHaveTodo.asObservable();
  }
  updateisHaveTodo(value: boolean) {
    this._isHaveTodo.next(value);
  }
  get todoss$(): Observable<any[] | null> {
    return this._todoss.asObservable();
  }
  get todos$(): Observable<any | null> {
    return this._todos.asObservable();
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
  async getAllTodos() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/todo`,options);
          const data = await response.json();
          this._todoss.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getTodosBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/todo/findslug/${Slug}`,options);
          const data = await response.json();
          this._todos.next(data)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getTodosByid(id:any) {
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
          this._todos.next(data)
          this._isHaveTodo.next(true)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchTodos(SearchParams:any) {
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
          this._todoss.next(data.items)
          this._totalCount.next(data.totalCount)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateTodos(item:any) {
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
          const Todos:any = this._todoss.value
          const Update = [data,...Todos]
          this._todoss.next(Update)
          return Update
      } catch (error) {
          return console.error(error);
      }
  }
  async SyncTodos(item:any) {
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
  async UpdateTodos(item:any) {
    const todoss:any = await this.todoss$.pipe(take(1)).toPromise();
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
          this._todos.next(data)
          const updateTodoss = todoss.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._todoss.next(updateTodoss);
          return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async DeleteTodos(item:any) {
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
