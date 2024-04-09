import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../models/user';
import { iPlayer } from '../../models/player';
import { PlayersService } from '../../players.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: iUser | undefined;
  squad!: iPlayer[]

  constructor(
    private authSvc: AuthService,
    private playerSvc: PlayersService) {}

  ngOnInit(){
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })

    this.playerSvc.favList.subscribe((favs:iPlayer[]) => {
      this.squad = favs
    })
  }

  removePlayer(id:number){
    this.playerSvc.removeFromFav(id)
  }
}
