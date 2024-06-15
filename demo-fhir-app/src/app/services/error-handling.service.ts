import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

      /**   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
      public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error); 
          console.log(`${operation} failed: ${error.error}`);
          return of(result as T);
        };
      }
  

}
