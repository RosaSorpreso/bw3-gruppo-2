import { Component } from '@angular/core';
import { iPlayer } from '../../models/player';
import { PlayersService } from '../../players.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  player!: iPlayer

  constructor(
    private playerSvc: PlayersService,
    private route:ActivatedRoute,
    private router: Router
  ){}

    ngOnInit(){
      this.route.params.subscribe((params: any) => {
        this.playerSvc.players$.subscribe(players => {
          const foundPlayer = players.find(p => p.id == params.id)
          if(foundPlayer) this.player = foundPlayer
        })
      })
    }

    editPlayer(){
      this.playerSvc.editPlayer(this.player).subscribe()
      if(this.player) this.router.navigate(['/players'])
    }

    isCollapsed: boolean = true;
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
