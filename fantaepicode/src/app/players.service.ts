import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { iPlayer } from './models/player';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  playersUrl:string = environment.playersUrl
  players: iPlayer[] = []
  playerSubject = new BehaviorSubject<iPlayer[]>([])
  $player = this.playerSubject.asObservable()

  constructor(private http:HttpClient) {
    this.getAllPlayers().subscribe(data => {
      this.playerSubject.next(data)
      this.players = data
    })
  }

  getAllPlayers(){
    return this.http.get<iPlayer[]>(this.playersUrl)
  }
}
