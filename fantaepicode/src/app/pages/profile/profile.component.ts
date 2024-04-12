import { Component, Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../models/user';
import { iPlayer } from '../../models/player';
import { PlayersService } from '../../players.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
@Injectable({
  providedIn: 'root'
})
export class ProfileComponent {
  [x: string]: any;

  user: iUser | undefined;
  squad!: iPlayer[]

  private squadBattle = new BehaviorSubject<iPlayer[]>([]);
  squadBattle$ = this.squadBattle.asObservable();

  constructor(
    private authSvc: AuthService,
    private playerSvc: PlayersService) {}

  ngOnInit(){
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })

    this.playerSvc.favList.subscribe((favs:iPlayer[]) => {
      this.squad = favs
    })
  }

  getSquad(){
    return this.squad
  }

  removePlayer(id:number){
    this.playerSvc.removeFromFav(id)
  }

  
}
