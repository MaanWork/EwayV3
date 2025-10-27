import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  handleApiCall<T>(obs: Observable<T>): Observable<any> {
    return obs.pipe(
      map((res: T) => {
        // const response = {
        //   statusCode: 200,
        //   status: true,
        //   message: "Successful response",
        //   data: res
        // };
        return res;
      }),
      catchError((err: any) => {
        // const errorResponse = {
        //   statusCode: err?.status || 500,
        //   status: false,
        //   message: err,
        //   data: err?.error || null
        // };

        console.error("Formatted error response:", err);
        return of(err);
      })
    );
  }
  // getData(url: string, version: string = 'v1.0'): Observable<any> {
  //   return this.get<any>(`${environment.apiUrl}/${version}/${url}`); // Call the base class get method
  // }

  // postData(url: string, data: any, version: string = 'v1.0'): Observable<any> {
  //   return this.post<any>(`${environment.apiUrl}/${version}/${url}`, data);
  // }

  // putData(url: string, data: any, version: string = 'v1.0'): Observable<any> {
  //   return this.put<any>(`${environment.apiUrl}/${version}/${url}`, data);
  // }

  // patchData(url: string, data: any, version: string = 'v1.0'): Observable<any> {
  //   return this.patch<any>(`${environment.apiUrl}/${version}/${url}`, data);
  // }

  // deleteData(url: string, version: string = 'v1.0'): Observable<any> {
  //   return this.delete<any>(`${environment.apiUrl}/${version}/${url}`);
  // }
}
