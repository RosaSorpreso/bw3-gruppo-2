import { Component } from '@angular/core';
import { PlayersService } from '../../players.service';
import { iPlayer } from '../../models/player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  players:iPlayer[]= []

  constructor(private playerSvc:PlayersService) { }

  ngOnInit() {
    this.playerSvc.getAllPlayers().subscribe(player => {
      this.players = player;
      console.log(this.players);
      
    })
  }
}
