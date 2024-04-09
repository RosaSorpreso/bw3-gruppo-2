import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { iPlayer } from './models/player';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http:HttpClient) { }

    player = new BehaviorSubject<iPlayer[]>([]);
    players$ = this.player.asObservable();

    getAllPlayers(): Observable<iPlayer[]> {
      return this.http.get<iPlayer[]>(environment.playersUrl)
    }

}
