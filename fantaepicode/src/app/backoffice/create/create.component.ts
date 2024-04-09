import { Component } from '@angular/core';
import { iPlayer } from '../../models/player';
import { PlayersService } from '../../players.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  players: iPlayer[] = [];
  newPlayer: iPlayer = {
    id: 0,
    firstName: '',
    lastName: '',
    skills:[''],
    price: 0,
    role: '',
    strenght: 0,
    image: ''
  };

  constructor(private playerSvc: PlayersService) { }

  ngOnInit(): void {
    this.loadPlayer();
  }

  loadPlayer() {
    this.playerSvc.getAllPlayers();
    this.playerSvc.players$.subscribe(player => {
      this.players = player;
    });
  }

  addPlayer() {
    this.playerSvc.addPlayer(this.newPlayer);
    this.newPlayer = {
      id: 0,
      firstName: '',
      lastName: '',
      skills:[''],
      price: 0,
      role: '',
      strenght: 0,
      image: ''
    };
  }
}
