import { Component } from '@angular/core';
import { iPlayer } from '../../models/player';
import { PlayersService } from '../../players.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {

  players: iPlayer[] = []
admin = false
  constructor(private playerSvc: PlayersService,){}

  ngOnInit() {
    this.playerSvc.getAllPlayers().subscribe(player => {
      this.players = player;
    });

    this.playerSvc.players$.subscribe(
      player => {
        this.players = player;
      });
  }

  addToFavs(prd:iPlayer) {
    this.playerSvc.addToFav(prd)
  }

  isFav(id:number) {
    return this.playerSvc.isFav(id)
  }

  deleteMovie(id: number) {
    this.playerSvc.deletePlayer(id);
  }

}
