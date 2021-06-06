import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.sass']
})
export class ScoreComponent implements OnInit {

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  finishGame(event: any): void {
    this.gameService.finishGame();
    this.router.navigate(['quiz']);
  }
}
