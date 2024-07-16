import { ErrorHandler, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CatcherrorService implements ErrorHandler {

  constructor() {
  }
  handleError(error:any) {
     console.log('An error occurred:', error.message);
  }
}
