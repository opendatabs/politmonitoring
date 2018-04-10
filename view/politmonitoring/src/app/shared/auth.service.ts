import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  requestLogin(): Observable<any> {
    return this.http.get(environment.apiUrl + 'auth');
  }

}
