import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  private adminSource = new BehaviorSubject<boolean>(false);
  currentAdminState = this.adminSource.asObservable();
  constructor(private http: HttpClient) { }

  requestLogin(): Observable<any> {
    return this.http.get(environment.apiUrl + 'auth');
  }

  changeAdminState(admin: boolean) {
    this.adminSource.next(admin);
  }
}
