import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  protected http: HttpClient; 

  constructor(http: HttpClient) {
    this.http = http;
  }

  protected isOnline(): boolean {
    return navigator.onLine;
  }

  protected get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    if (!this.isOnline()) {
      console.error('No internet connectivity. API call aborted.');
      return of(null);
    }
  
    return this.http.get<T>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error during API call:', error);
        return throwError(() => new Error('API call failed: ' + error.message));
      })
    );
  }

  protected post<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    if (!this.isOnline()) {
      console.error('No internet connectivity. API call aborted.');
      return of(null);
    }

    return this.http.post<T>(url, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error during API call:', error);
        return throwError(() => new Error('API call failed: ' + error.message));
      })
    );
  }

  protected put<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    if (!this.isOnline()) {
      console.error('No internet connectivity. API call aborted.');
      return of(null);
    }

    return this.http.put<T>(url, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error during API call:', error);
        return throwError(() => new Error('API call failed: ' + error.message));
      })
    );
  }

  protected patch<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    if (!this.isOnline()) {
      console.error('No internet connectivity. API call aborted.');
      return of(null);
    }

    return this.http.patch<T>(url, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error during API call:', error);
        return throwError(() => new Error('API call failed: ' + error.message));
      })
    );
  }

  protected delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    if (!this.isOnline()) {
      console.error('No internet connectivity. API call aborted.');
      return of(null);
    }

    return this.http.delete<T>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error during API call:', error);
        return throwError(() => new Error('API call failed: ' + error.message));
      })
    );
  }
}
