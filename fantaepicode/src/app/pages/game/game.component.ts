import { Component } from '@angular/core';
import { PlayersService } from '../../players.service';
import { iPlayer } from '../../models/player';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  players:iPlayer[] = []
  players2:iPlayer[] = []
  strenght1:number = 0;
  strenght2:number= 0;
  squad:iPlayer[] = []

  constructor(private playerSvc: PlayersService){}
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
      this.playerSvc.favList.subscribe((favs:iPlayer[]) => {
        this.squad = favs
      })
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
  getNftClasses(i: number): object {
    return {
      ['animation-sbam' + (i + 1)]: this.fight,
      ['animation-jump']: !this.fight
    };
  }
  getNftClasses2(i: number): object {
    return {
      ['animation-match' + (i + 1)]: this.fight,
      ['animation-jump']: !this.fight
    };
  }

  battleWin(){
    this.players.forEach(p => this.strenght1 += p.strenght)
    this.players.forEach(p => this.strenght2 += p.strenght)
  }
}
