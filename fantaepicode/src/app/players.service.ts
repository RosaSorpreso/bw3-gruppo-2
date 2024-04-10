import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { iPlayer } from './models/player';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playerSubject = new BehaviorSubject<iPlayer[]>([]);
  players$ = this.playerSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.getAllPlayers().subscribe(
      players => {
        this.playerSubject.next(players);
      }
    );
  }

  getAllPlayers(): Observable<iPlayer[]> {
    return this.http.get<iPlayer[]>(environment.playersUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching players:', error);
          throw error;
        })
      );
  }

  addPlayer(player: iPlayer): Observable<iPlayer> {
    return this.http.post<iPlayer>(environment.playersUrl, player)
      .pipe(
        tap(newPlayer => {
          const currentPlayers = this.playerSubject.getValue();
          this.playerSubject.next([...currentPlayers, newPlayer]);
        }),
        catchError(error => {
          console.error('Error adding player:', error);
          throw error;
        })
      );
  }

  editPlayer(player: iPlayer): Observable<iPlayer> {
    return this.http.put<iPlayer>(`${environment.playersUrl}/${player.id}`, player)
      .pipe(
        tap(editedPlayer => {
          const currentPlayers = this.playerSubject.getValue();
          const index = currentPlayers.findIndex(p => p.id === player.id);
          if (index !== -1) {
            currentPlayers[index] = editedPlayer;
          }
          this.playerSubject.next([...currentPlayers]);
        }),
        catchError(error => {
          console.error('Error editing player:', error);
          throw error;
        })
      );
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.playersUrl}/${id}`)
      .pipe(
        tap(() => {
          const currentPlayers = this.playerSubject.getValue();
          const updatedPlayers = currentPlayers.filter(p => p.id !== id);
          this.playerSubject.next(updatedPlayers);
        }),
        catchError(error => {
          console.error('Error deleting player:', error);
          throw error;
        })
      );
  }

  fav: iPlayer[] = [];

  addToFav(player: iPlayer) {
    if (!this.isFav(player.id)) {
      this.fav.push(player);
    }
  }

  removeFromFav(id: number) {
    const index = this.fav.findIndex(el => el.id === id);
    if (index !== -1) {
      this.fav.splice(index, 1);
    }
  }

  get favList(): Observable<iPlayer[]> {
    return new Observable((obs) => {
      obs.next(this.fav);
    });
  }

  isFav(id: number): iPlayer | undefined {
    return this.fav.find(prd => prd.id === id);
  }
}
