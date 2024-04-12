import { iPlayer } from './../../models/player';
import { PlayersService } from '../../players.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  players:iPlayer[] =[]

  constructor(private playerSvc: PlayersService,){}

  ngOnInit() {
    this.playerSvc.getAllPlayers().subscribe(player => {
      this.players = player.filter(player => player.strenght > 9.5)
    });

    this.playerSvc.players$.subscribe(
      player => {
        this.players = player;
      });

  }
}
