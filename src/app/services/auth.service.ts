import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataLogin } from '../interfaces/data-login';
import { environment } from '../../environments/environment';
import { Observable, of, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataRegister } from '../interfaces/data-register';
import { DataUser } from '../interfaces/data-user';
import { DataUserRegister } from '../interfaces/data-user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  private urlBase = environment.urlBase;

  login(data: DataLogin): Observable<DataUser>{
    return this.http.post(`${this.urlBase}/auth/login/`, data)
      .pipe(
        map( resp => resp as DataUser ),
        catchError( err => of(err.error))
      );
  }

  register(data: DataRegister): Observable<DataUserRegister>{
    return this.http.post(`${this.urlBase}/users`, data).pipe(
      map( resp => resp as DataUserRegister ),
      catchError( err => of(err.error))
    );
  }
}
