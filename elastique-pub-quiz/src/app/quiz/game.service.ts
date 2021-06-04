import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private playerName?: string;

  constructor() { }

  public getPlayerName() {
    return this.playerName;
  }

  public setPlayerName(name: string) {
    this.playerName = name;
  }

  public startGame() {
    // start the websocket stuff
  }
}
