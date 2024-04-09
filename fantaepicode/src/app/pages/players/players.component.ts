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

  constructor(private playerSvc: PlayersService,){}

  ngOnInit(){
    this.playerSvc.$player.subscribe(player => {
      this.players = player
    })
  }

}
