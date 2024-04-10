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

  filteredPlayers: iPlayer[] | undefined;

  minStrenght: number = 0;
  maxStrenght: number  = 1000;

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
    this.playerSvc.deletePlayer(id).subscribe();
  }


  filterPlayers() {
    if (this.minStrenght !== undefined && this.maxStrenght !== undefined) {
      this.filteredPlayers = this.players.filter(p => p.strenght >= this.minStrenght && p.strenght <= this.maxStrenght);
      this.filteredPlayers.sort((a, b) => b.strenght - a.strenght);  // Ordina dalla più forte alla più debole
    } else {
      this.filteredPlayers = undefined;
    }
  }

  filterPlayers2() {
    if (this.minStrenght !== undefined && this.maxStrenght !== undefined) {
      this.filteredPlayers = this.players.filter(p => p.strenght >= this.minStrenght && p.strenght <= this.maxStrenght);
      this.filteredPlayers.sort((a, b) => a.strenght - b.strenght);
    } else {
      this.filteredPlayers = undefined;
    }
  }

  filterPlayers3() {
    this.playerSvc.getAllPlayers().subscribe(res => {
      this.players = this.shuffle(res)
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

}
