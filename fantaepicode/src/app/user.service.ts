import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment.development';
import { iUser } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new Subject<iUser[]>()

  users$ = this.user.asObservable()

  constructor(private http:HttpClient) {}

  getAllUsers(){
    return this.http.get<iUser[]>(environment.usersUrl)
    .subscribe(users => this.user.next(users))
  }
}
