import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {
  name?: string;

  constructor(
    private router: Router,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.name = this.gameService.getPlayerName();
  }

  onSubmit(event: Event): void {
    console.log(`confirmed `);
    this.router.navigate(['score'])
  }
}
