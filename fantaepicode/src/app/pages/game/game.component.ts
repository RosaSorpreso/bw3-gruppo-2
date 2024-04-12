import { Component } from '@angular/core';
import { PlayersService } from '../../players.service';
import { iPlayer } from '../../models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  players:iPlayer[] = []
  players2:iPlayer[] = []

  constructor(private playerSvc: PlayersService,){}
  fight:boolean =false



  ngOnInit() {
    this.playerSvc.getAllPlayers().subscribe(player => {
      this.players = this.shuffle(player).splice(0, 4)
      this.players2 = this.shuffle(player).splice(0, 4)

    });

    this.playerSvc.players$.subscribe(
      player => {
        this.players = player;
      });
  }
  shuffle(array: any[]): any[] {
    let currentIndex = array.length;
    let randomIndex: number;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  startFight():boolean{
    return this.fight=true
  }
}
