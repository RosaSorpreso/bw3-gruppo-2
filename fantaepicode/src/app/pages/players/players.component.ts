import { Component } from '@angular/core';
import { iPlayer } from '../../models/player';
import { PlayersService } from '../../players.service';
import { iUser } from '../../models/user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {

  players: iPlayer[] = []
  user: iUser | undefined;

  constructor(
    private playerSvc: PlayersService,
    private authSvc: AuthService){}

  ngOnInit() {
    this.playerSvc.getAllPlayers().subscribe(player => {
      this.players = player;
    });

    this.playerSvc.players$.subscribe(
      player => {
        this.players = player;
      });

    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })
  }

  addToFavs(prd:iPlayer) {
    this.playerSvc.addToFav(prd)
  }

  isFav(id:number) {
    return this.playerSvc.isFav(id)
  }

  deletePlayer(id: number) {
    this.playerSvc.deletePlayer(id);
  }

}
