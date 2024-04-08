import { Injectable } from '@angular/core';
import { iUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, tap, Observable } from 'rxjs';
import { UserService } from '../user.service';
import { environment } from '../../environments/environment.development';
import { iLogin } from '../models/login';

type AccessData = {
  token:string,
  user:iUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper:JwtHelperService = new JwtHelperService()

  authSubj = new BehaviorSubject<iUser|null>(null)

  user$ = this.authSubj.asObservable()
  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user =>  this.syncIsLoggedIn = user)
    )

  syncIsLoggedIn:boolean = false;

  constructor(
    private http:HttpClient,
    private router:Router,
    ) {
      this.restoreUser()
    }

  registerUrl:string = environment.registerUrl
  loginUrl:string = environment.loginUrl

  register(newUser:Partial<iUser>):Observable<AccessData>{
    return this.http.post<AccessData>(this.registerUrl, newUser)
    }

  login(loginData:iLogin):Observable<AccessData> {
    return this.http.post<AccessData>(this.loginUrl,loginData)
    .pipe(tap(data => {
      this.authSubj.next(data.user)
      localStorage.setItem('accessData', JSON.stringify(data))
      this.autoLogout(data.token)
    }))
  }

  logout(){
    this.authSubj.next(null)
    localStorage.removeItem('accessData')
    this.router.navigate(['/auth/login'])
  }

  getAccessToken():string{
    const userJson = localStorage.getItem('accessData')
    if(!userJson) return ''
    const accessData:AccessData = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(accessData.token)) return '';
    return accessData.token
  }

  autoLogout(jwt: string): void {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(jwt);
    
    if (expirationDate) {
      const expiresInMs = expirationDate.getTime() - new Date().getTime();
      
      setTimeout(() => {
        this.logout();
      }, expiresInMs);
    }
  }
  

  restoreUser(){
    const userJson = localStorage.getItem('accessData')
    if(!userJson) return;
    const accessData:AccessData = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(accessData.token)) return;
    this.authSubj.next(accessData.user)
    this.autoLogout(accessData.token)
  }
  errors(err: any) {
    switch (err.error) {
        case "Email and Password are required":
            return new Error('Email e password obbligatorie');
            break;
        case "Email already exists":
            return new Error('Utente esistente');
            break;
        case 'Email format is invalid':
            return new Error('Email scritta male');
            break;
        case 'Cannot find user':
            return new Error('utente inesistente');
            break;
            default:
        return new Error('Errore');
            break;
    }
  }
}
