import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers:HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private loggedToken: BehaviorSubject<any> = new BehaviorSubject<any>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isloggedToken() {
    return this.loggedToken.asObservable();
  }
  constructor(private http: HttpClient) { } 

  login() {
    this.http.post('url', { username: null, password: null}, { headers: this.headers });
  }
  
  UserToken(newUserToken: any) {
    this.loggedToken.next(newUserToken);
  }

  getLoginDetails() {
    try {
      const userDetails = sessionStorage.getItem('Userdetails');
      
      // Check if item exists
      if (!userDetails) {
        console.warn('User details not found in sessionStorage');
        return null; // Or you can return an empty object or handle accordingly
      }
      
      // Attempt to parse the stored JSON data
      return JSON.parse(userDetails);
    } catch (error) {
      console.error('Error parsing user details from sessionStorage:', error);
      return null; // Or handle the error as needed
    }
  }

  logout() {
    this.loggedIn.next(false);
  }
}
