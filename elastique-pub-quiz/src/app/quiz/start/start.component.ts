import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass']
})
export class StartComponent implements OnInit {
  public characterName = '';

  constructor(
    private router: Router,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(event: Event): void {
    this.gameService.setPlayerName(this.characterName);
    this.gameService.startGame();
    this.router.navigate(['question']);
  }
}
