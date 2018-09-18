import { Injectable } from '@angular/core';
import { Http, Headers, } from '@angular/http';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http,
    public jwtHelper: JwtHelperService) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/users/register', user, { headers: headers }) // local
    return this.http.post('users/register', user, { headers: headers }) // heroku
      // .map(res => res.json());
      .pipe(map((response: any) => response.json()))
      .pipe(catchError(this.handleError));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', user, { headers: headers })
      // .map(res => res.json());
      .pipe(map((response: any) => response.json()))
      .pipe(catchError(this.handleError));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/profile', { headers: headers })
      .pipe(map((response: any) => response.json()))
      .pipe(catchError(this.handleError));
  }

  storeUserData(token, user) {
    //jwt look for this path (id_token) automatically 
    localStorage.setItem('id_token', token);
    //local storage only storage a string
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return this.jwtHelper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  /**
	 * Handle error
	 * @param error
	 * @returns {any}
	 */
  private handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

}
