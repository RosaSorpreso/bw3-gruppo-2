import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment.development';
import { iUser } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = environment.usersUrl

  users: iUser[] = []

  userSubj = new BehaviorSubject<iUser[]>([])

  $users = this.userSubj.asObservable()

  constructor(private http:HttpClient) {
  }

  getAllUsers(){
    return this.http.get<iUser[]>(this.userUrl)
  }
}
