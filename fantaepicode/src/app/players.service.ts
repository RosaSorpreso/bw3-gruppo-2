import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { iPlayer } from './models/player';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http:HttpClient) { }

    player = new BehaviorSubject<iPlayer[]>([]);
    players$ = this.player.asObservable();

    getAllPlayers(): Observable<iPlayer[]> {
      return this.http.get<iPlayer[]>(environment.playersUrl)
    }

    fav: iPlayer[] = [];

  private playerSubject = new Subject<iPlayer[]>();
  player$ = this.playerSubject.asObservable();

  getAllMovies() {
    return this.http.get<iPlayer[]>(environment.playersUrl)
      .subscribe(player => this.player.next(player));
  }

  // addMovie(movie: iMovies) {
  //   return this.http.post<iMovies>(environment.playersUrl, movie)
  //     .subscribe(newMovie => {
  //       this.getAllMovies();
  //     });
  // }

  // deleteMovie(id: number) {
  //   return this.http.delete(${environment.playersUrl}/${id})
  //     .subscribe(() => {
  //       this.getAllMovies();
  //     });
  // }

  addToFav(prod: iPlayer) {
    const player = this.fav.find(player => player.id === prod.id);
    if (!player) {
      this.fav.push(prod);
    }
  }

  removeFromFav(id: number) {
    const index = this.fav.findIndex(el => el.id === id);
    this.fav.splice(index, 1);
  }

  get favList() {
    return new Observable((obs: Observer<iPlayer[]>) => {
      obs.next(this.fav);
    });
  }

  isFav(id: number) {
    return this.fav.find(prd => prd.id === id);
  }
}
