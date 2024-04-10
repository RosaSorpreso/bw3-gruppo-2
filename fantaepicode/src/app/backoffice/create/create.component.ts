import { Component } from '@angular/core';
import { iPlayer } from '../../models/player';
import { PlayersService } from '../../players.service';
import { Router } from '@angular/router';

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
    skills:[''],
    price: 0,
    role: '',
    strenght: 0,
    image: ''
  };

  constructor(
    private playerSvc: PlayersService,
    private router: Router) { }

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
    this.playerSvc.addPlayer(this.newPlayer).subscribe(
      newPlayer => {
        this.players.push(newPlayer);
        this.newPlayer = {
          id: 0,
          firstName: '',
          skills:[''],
          price: 0,
          role: '',
          strenght: 0,
          image: ''
        };
      },
      error => {
        console.error('Error adding player:', error);
      }
    )
    if(this.newPlayer) this.router.navigate(['/players']);
  }


  isCollapsed: boolean = true;
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
