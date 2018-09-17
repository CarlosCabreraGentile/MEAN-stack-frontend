import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers,  } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
// import  'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authToken: any;
  user: any;   

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers:headers})
    // .map(res => res.json());
    .pipe(map((response: any) => response.json()))
		.pipe(catchError(this.handleError));
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
