import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { isMultipleChoiceProblem, isOpenProblem } from '../interfaces';
import { MultipleChoiceQuestion } from '../multiple-choice-question';
import { OpenQuestion } from '../open-question';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.sass']
})
export class ScoreComponent implements OnInit {
  questions?: (MultipleChoiceQuestion | OpenQuestion)[];

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.questions = this.gameService.allQuestions
      .filter(q => isMultipleChoiceProblem(q) || isOpenProblem(q)) as (MultipleChoiceQuestion | OpenQuestion)[];
  }

  finishGame(event: any): void {
    this.gameService.finishGame();
    this.router.navigate(['quiz']);
  }
}
