import { Component } from '@angular/core';
import { PlayersService } from '../../players.service';
import { iPlayer } from '../../models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  players:iPlayer[] =[]

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
}
